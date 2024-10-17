import express from "express";
import {
  getRequests,
  createRequest,
  deleteRequest,
  updateRequest,
} from "../controllers/requestController.js";

const router = express.Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.delete("/:id", deleteRequest);
router.put("/:id", updateRequest);

export default router;
