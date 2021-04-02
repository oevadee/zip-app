import express from "express";

import { login, getUsers, register } from "../controllers/usersController";

const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/register", register);

export default router;
