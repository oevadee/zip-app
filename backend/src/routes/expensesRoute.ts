import express from "express";

import { getAllUserExpenses } from "../controllers/expensesController";

const router = express.Router();

router.get("/", getAllUserExpenses);

export default router;
