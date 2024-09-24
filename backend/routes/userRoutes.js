import express from "express";
import {
  UserRegistration,
  UserLogin,
  UserLogout,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", UserRegistration);
router.post("/login", UserLogin);
router.post("/logout", UserLogout);

export default router;
