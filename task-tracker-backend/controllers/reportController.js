// controllers/reportController.js
import Report from "../models/Report.js";

// Create report
export const createReport = async (req, res) => {
  try {
    let weeklyTask = "";

    if (isEditableDay()) {
      weeklyTask = req.body.weeklyTask;
    }

    const report = new Report({
      ...req.body,
      weeklyTask,
      user: req.user.id
    });

    await report.save();

    res.status(201).json(report);

  } catch (err) {
    res.status(500).json(err);
  }
};

const isEditableDay = () => {
  const day = new Date().getDay(); // 0=Sun,1=Mon...

  return day === 1 || day === 3 || day === 5;
};

// Add activity
export const addActivity = async (req, res) => {
  const report = await Report.findById(req.params.id);

  report.activities.push(req.body);
  await report.save();

  res.json(report);
};

export const updateWeeklyTask = async (req, res) => {
  try {
    if (!isEditableDay()) {
      return res.status(403).json({
        msg: "Weekly task can only be edited on Mon/Wed/Fri"
      });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      {
        weeklyTask: req.body.weeklyTask,
        weeklyTaskLastUpdated: new Date()
      },
      { new: true }
    );

    res.json(report);

  } catch (err) {
    res.status(500).json(err);
  }
};