import express from "express";

import {
  getAllUserExpenses,
  createExpense,
  getHistory,
} from "../controllers/expensesController";

const router = express.Router();

router.get("/", getAllUserExpenses);
router.post("/:userId", createExpense);
router.get("/history/:externalId", getHistory);

export default router;
