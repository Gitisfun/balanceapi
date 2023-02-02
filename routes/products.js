import express from "express";
import queryHandler from "../database/query/queryHandler.js";
import { QUERY_GET, QUERY_COUNT, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE } from "../database/tables/products.js";
import Pagination from "../logic/pagination.js";
import authenticator from "../middleware/authenticator.js";

const router = express.Router();

router.get("/", authenticator, (req, res, next) => {
  const paramList = [req.userId];
  const temp = Pagination.validateData(req.query, ["name", "description", "brand"]);
  paramList.push(temp.searchField);
  paramList.push(temp.limit);
  paramList.push(temp.offset);
  Pagination.queryHandler(QUERY_GET_ALL, temp, paramList, QUERY_COUNT, [req.userId, temp.searchField], res, next);
});

router.get("/:id", authenticator, (req, res, next) => {
  const paramList = [req.userId, req.params.id];
  queryHandler(QUERY_GET, paramList, res, next);
});

router.post("/", authenticator, (req, res, next) => {
  const paramList = [req.body.name, req.body.description, req.body.brand, req.body.categoryId, req.body.weightType, req.userId];
  queryHandler(QUERY_CREATE, paramList, res, next);
});

router.put("/:id", authenticator, (req, res, next) => {
  const paramList = [req.body.name, req.body.description, req.body.brand, req.body.categoryId, req.body.weightType, req.params.id];
  queryHandler(QUERY_UPDATE, paramList, res, next);
});

router.delete("/:id", authenticator, (req, res, next) => {
  const paramList = [req.params.id];
  queryHandler(QUERY_DELETE, paramList, res, next);
});

export default router;
