// controllers/reportController.js
import Report from "../models/Report.js";

const isEditableDay = () => {
  const day = new Date().getDay();
  return day === 1 || day === 3 || day === 5; // Mon, Wed, Fri
};

// Helper function to get date string without time
const getDateString = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

// Create report
export const createReport = async (req, res) => {
  try {
    const { cw, weeklyTask, activities, date } = req.body;

    // Find existing report for this user and CW
    let existingReport = await Report.findOne({
      user: req.user.id,
      cw,
    });

    // CASE 1: Only saving weekly task (no activities)
    if (!activities || activities.length === 0) {
      if (existingReport) {
        // Update existing report with new weekly task
        if (!isEditableDay()) {
          return res.status(403).json({
            msg: "Weekly task can only be edited on Mon/Wed/Fri",
          });
        }
        
        existingReport.weeklyTask = weeklyTask;
        existingReport.weeklyTaskLastUpdated = new Date();
        await existingReport.save();
        
        return res.json(existingReport);
      } else {
        // Create new report with only weekly task
        const report = new Report({
          cw,
          weeklyTask,
          user: req.user.id,
          dailyTasks: []
        });
        
        await report.save();
        return res.status(201).json(report);
      }
    }
    
    // CASE 2: Saving activities for a specific date
    else {
      if (!date) {
        return res.status(400).json({
          msg: "Date is required when saving activities"
        });
      }

      if (!existingReport) {
        // Create new report with weekly task and daily tasks
        if (!weeklyTask) {
          return res.status(400).json({
            msg: "Weekly task is required before adding activities",
          });
        }
        
        existingReport = new Report({
          cw,
          weeklyTask,
          user: req.user.id,
          dailyTasks: []
        });
      }

      // Find if daily task already exists for this date
      const dateStr = getDateString(date);
      const existingDailyTask = existingReport.dailyTasks.find(
        task => getDateString(task.date) === dateStr
      );

      if (existingDailyTask) {
        // Add activities to existing daily task
        existingDailyTask.activities.push(...activities);
      } else {
        // Create new daily task entry
        existingReport.dailyTasks.push({
          date: new Date(date),
          activities: activities
        });
      }

      await existingReport.save();
      
      return res.json(existingReport);
    }
  } catch (err) {
    console.error("Error in createReport:", err);
    res.status(500).json({ error: err.message });
  }
};

export const addActivity = async (req, res) => {
  try {
    const { date, activities } = req.body;
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }
    
    const dateStr = getDateString(date);
    const existingDailyTask = report.dailyTasks.find(
      task => getDateString(task.date) === dateStr
    );

    if (existingDailyTask) {
      existingDailyTask.activities.push(...activities);
    } else {
      report.dailyTasks.push({
        date: new Date(date),
        activities: activities
      });
    }
    
    await report.save();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWeeklyTask = async (req, res) => {
  try {
    if (!isEditableDay()) {
      return res.status(403).json({
        msg: "Weekly task can only be edited on Mon/Wed/Fri",
      });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        weeklyTask: req.body.weeklyTask,
        weeklyTaskLastUpdated: new Date(),
      },
      { new: true },
    );

    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWeeklyReport = async (req, res) => {
  try {
    const { cw } = req.query;
    
    if (!cw) {
      return res.status(400).json({ 
        msg: "Calendar week (cw) parameter is required" 
      });
    }
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        msg: "User not authenticated" 
      });
    }
    
    const report = await Report.findOne({
      user: req.user.id,
      cw: cw,
    }).sort({ createdAt: -1 });
    
    res.json(report);
    
  } catch (err) {
    console.error('Error in getWeeklyReport:', err);
    res.status(500).json({ 
      msg: "Error fetching weekly report",
      error: err.message 
    });
  }
};

// New endpoint to get daily tasks for a specific date
export const getDailyTasks = async (req, res) => {
  try {
    const { cw, date } = req.query;
    
    if (!cw || !date) {
      return res.status(400).json({
        msg: "Both cw and date parameters are required"
      });
    }
    
    const report = await Report.findOne({
      user: req.user.id,
      cw: cw,
    });
    
    if (!report) {
      return res.json({ activities: [] });
    }
    
    const dateStr = getDateString(date);
    const dailyTask = report.dailyTasks.find(
      task => getDateString(task.date) === dateStr
    );
    
    res.json({ activities: dailyTask?.activities || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};