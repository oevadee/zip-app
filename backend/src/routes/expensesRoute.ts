import express from "express";

import { getExpensesFromUser } from "../controllers/expensesController";

const router = express.Router();

router.get("/:userId", getExpensesFromUser);

export default router;
