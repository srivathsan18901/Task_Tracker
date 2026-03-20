import express from "express";
import { createReport, addActivity,updateWeeklyTask } from "../controllers/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createReport);
router.post("/:id/activity", verifyToken, addActivity);
router.put("/:id/weekly-task", verifyToken, updateWeeklyTask);

export default router;
