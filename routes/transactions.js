import express from "express";
import MultipleController from "../database/query/MultipleController.js";
import queryHandler from "../database/query/queryHandler.js";
import { QUERY_CREATE_LIST } from "../database/tables/transactionProducts.js";
import { QUERY_GET, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_COUNT, TABLE_NAME_TRANSACTIONS, QUERY_GET_ALL_MONTH } from "../database/tables/transactions.js";
import Pagination from "../logic/pagination.js";
import authenticator from "../middleware/authenticator.js";

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
  const paramList = [req.userId];
  const temp = Pagination.validateData(req.query, ["name", "description"]);
  paramList.push(temp.searchField);
  paramList.push(temp.limit);
  paramList.push(temp.offset);
  Pagination.queryHandler(QUERY_GET_ALL, temp, paramList, QUERY_COUNT, [req.userId, temp.searchField], res, next);
});

router.get("/month", authenticator, (req, res, next) => {
  const paramList = [req.userId, req.query.month, req.query.year];
  queryHandler(QUERY_GET_ALL_MONTH, paramList, res, next);
});

router.get("/:id", authenticator, (req, res, next) => {
  const paramList = [req.userId, req.params.id];
  queryHandler(QUERY_GET, paramList, res, next);
});

router.post("/", authenticator, (req, res, next) => {
  const paramList = [req.body.name, req.body.price, req.body.description, req.body.date, req.body.type, req.body.shop, req.userId];
  const queries = {
    create: QUERY_CREATE(),
    list: QUERY_CREATE_LIST(),
  };
  MultipleController.create(TABLE_NAME_TRANSACTIONS, paramList, queries, req, res, next);
});

router.put("/:id", authenticator, (req, res, next) => {
  const paramList = [req.body.name, req.body.price, req.body.description, req.body.date, req.body.type, req.body.shop, req.params.id];
  queryHandler(QUERY_UPDATE, paramList, res, next);
});

router.delete("/:id", authenticator, (req, res, next) => {
  const paramList = [req.params.id];
  //queryHandler(QUERY_DELETE, paramList, res, next);
  MultipleController.deleteTransaction(paramList, req, res, next);
});

export default router;
