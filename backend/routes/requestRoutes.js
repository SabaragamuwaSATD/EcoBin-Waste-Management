import express from "express";
import {
  getRequests,
  createRequest,
  deleteRequest,
} from "../controllers/requestController.js";

const router = express.Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.delete("/:id", deleteRequest);

export default router;
