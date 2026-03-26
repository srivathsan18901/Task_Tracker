// routes/reportRoutes.js
import express from "express";
import { 
  createReport, 
  addActivity, 
  updateWeeklyTask, 
  getWeeklyReport,
  getDailyTasks  // Add this new endpoint
} from "../controllers/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createReport);
router.post("/:id/activity", verifyToken, addActivity);
router.put("/:id/weekly-task", verifyToken, updateWeeklyTask);
router.get("/week", verifyToken, getWeeklyReport);
router.get("/daily", verifyToken, getDailyTasks);  // New endpoint for daily tasks

export default router;