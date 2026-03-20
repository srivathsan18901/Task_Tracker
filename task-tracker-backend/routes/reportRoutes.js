import express from "express";
import { createReport, addActivity } from "../controllers/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createReport);
router.post("/:id/activity", verifyToken, addActivity);

export default router;
