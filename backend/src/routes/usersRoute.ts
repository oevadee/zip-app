import express from "express";

import {
  login,
  getUsers,
  getProfile,
  updateProfile,
  register,
} from "../controllers/usersController";

const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/register", register);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

export default router;
