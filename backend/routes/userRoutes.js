import express from "express";
import {
  UserRegistration,
  UserLogin,
  UserLogout,
  getAllUsers,
  updateUserRole,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", UserRegistration);
router.post("/login", UserLogin);
router.post("/logout", UserLogout);
router.get("/", getAllUsers);
router.patch("/:id", updateUserRole);

export default router;
