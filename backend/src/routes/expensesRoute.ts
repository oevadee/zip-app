import express from "express";

import {
  getAllUserExpenses,
  createExpense,
  getHistory,
  handleDeleteRequest
} from "../controllers/expensesController";

const router = express.Router();

router.get("/", getAllUserExpenses);
router.post("/:userId", createExpense);
router.get("/history/:externalId", getHistory);
router.post('/history/delete-request', handleDeleteRequest)

export default router;
