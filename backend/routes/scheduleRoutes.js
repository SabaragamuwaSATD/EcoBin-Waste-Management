import express from "express";
import {
  getSchedules,
  createSchedule,
  deleteSchedule,
  updateSchedule,
} from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/", getSchedules);
router.post("/", createSchedule);
router.delete("/:id", deleteSchedule);
router.put("/:id", updateSchedule);

export default router;
