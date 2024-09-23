import express from "express";
import { UserRegistration, UserLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", UserRegistration);
router.post("/login", UserLogin);

export default router;
