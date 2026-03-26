// models/Report.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  fromTime: { type: String },
  toTime: { type: String },
  workDone: { type: String },
  completion: { type: Number },
  remarks: { type: String }
});

// New schema for daily tasks
const dailyTaskSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  activities: [activitySchema]
});

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  cw: { type: String, required: true }, // Calendar Week (e.g., "CW13")
  weeklyTask: String,
  weeklyTaskLastUpdated: Date,

  // Changed from single date + activities to daily tasks array
  dailyTasks: [dailyTaskSchema]

}, { timestamps: true });

// Add index for faster queries
reportSchema.index({ user: 1, cw: 1 });

export default mongoose.model("Report", reportSchema);