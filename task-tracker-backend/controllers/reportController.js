// controllers/reportController.js
import Report from "../models/Report.js";

// Create report
export const createReport = async (req, res) => {
  try {
    const report = new Report({
      ...req.body,
      user: req.user.id
    });

    await report.save();
    res.status(201).json(report);

  } catch (err) {
    res.status(500).json(err);
  }
};

// Add activity
export const addActivity = async (req, res) => {
  const report = await Report.findById(req.params.id);

  report.activities.push(req.body);
  await report.save();

  res.json(report);
};