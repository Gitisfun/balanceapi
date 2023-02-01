import express from "express";
import queryHandler from "../database/query/queryHandler.js";
import { QUERY_GET_SHOP } from "../database/tables/transactions.js";
import authenticator from "../middleware/authenticator.js";

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
  const paramList = [req.userId];
  queryHandler(QUERY_GET_SHOP, paramList, res, next);
});

export default router;
