import express from "express";
import Statistics from "../database/tables/statistics.js";
import authenticator from "../middleware/authenticator.js";

const router = express.Router();

router.get("/transactions/income/period", authenticator, (req, res, next) => {
  Statistics.transactions_period_income(req, res, next);
});

router.get("/transactions/expenses/period", authenticator, (req, res, next) => {
  Statistics.transactions_period_expenses(req, res, next);
});

router.get("/transactions/income/week", authenticator, (req, res, next) => {
  Statistics.transactions_week_income(req, res, next);
});

router.get("/transactions/expenses/week", authenticator, (req, res, next) => {
  Statistics.transactions_week_expenses(req, res, next);
});

router.get("/transactions/income/month", authenticator, (req, res, next) => {
  Statistics.transactions_month_income(req, res, next);
});

router.get("/transactions/expenses/month", authenticator, (req, res, next) => {
  Statistics.transactions_month_expenses(req, res, next);
});

router.get("/transactions/income/year", authenticator, (req, res, next) => {
  Statistics.transactions_year_income(req, res, next);
});

router.get("/transactions/expenses/year", authenticator, (req, res, next) => {
  Statistics.transactions_year_expenses(req, res, next);
});

router.get("/products/income", authenticator, (req, res, next) => {
  Statistics.products_income(req, res, next);
});

router.get("/products/expenses", authenticator, (req, res, next) => {
  Statistics.products_expenses(req, res, next);
});

router.get("/categories/income", authenticator, (req, res, next) => {
  Statistics.categories_income(req, res, next);
});

router.get("/categories/expenses", authenticator, (req, res, next) => {
  Statistics.categories_expenses(req, res, next);
});

router.get("/shops/expenses", authenticator, (req, res, next) => {
  Statistics.shops_expenses(req, res, next);
});

export default router;
