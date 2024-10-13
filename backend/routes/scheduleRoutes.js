import express from "express";
import {
  getSchedules,
  createSchedule,
  deleteSchedule,
  updateSchedule,
  updateCollectionStatus,
} from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/", getSchedules);
router.post("/", createSchedule);
router.delete("/:id", deleteSchedule);
router.put("/:id", updateSchedule);
// PUT route to update the collection status
router.put('/:id/status', updateCollectionStatus);

export default router;
