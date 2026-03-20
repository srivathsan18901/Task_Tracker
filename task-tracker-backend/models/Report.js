// models/Report.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  fromTime: { type: String },
  toTime: { type: String },
  workDone: { type: String },
  completion: { type: Number },
  remarks: { type: String }
});

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: { type: Date, required: true },
  cw: { type: String, required: true },

  weeklyTask: String,
  weeklyTaskLastUpdated: Date,

  activities: [activitySchema]

}, { timestamps: true });

export default mongoose.model("Report", reportSchema);