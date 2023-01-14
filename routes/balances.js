import express from "express";
import queryHandler from "../database/query/queryHandler.js";
import { QUERY_GET, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE } from "../database/tables/balances.js";

const router = express.Router();

router.get(
  "/",
  /*authenticator,*/ (req, res, next) => {
    //const paramList = [req.account_id];
    const paramList = [1];
    queryHandler(QUERY_GET_ALL, paramList, res, next);
  }
);

router.get(
  "/:id",
  /*authenticator,*/ (req, res, next) => {
    const paramList = [1, req.params.id];
    queryHandler(QUERY_GET, paramList, res, next);
  }
);

router.post(
  "/",
  /*authenticator,*/ (req, res, next) => {
    //const paramList = [req.body.name, req.account_id];
    const paramList = [req.body.name, req.body.type, req.body.amount, 1];
    queryHandler(QUERY_CREATE, paramList, res, next);
  }
);

router.put(
  "/:id",
  /*authenticator,*/ (req, res, next) => {
    const paramList = [req.body.name, req.body.type, req.body.amount, req.params.id];
    queryHandler(QUERY_UPDATE, paramList, res, next);
  }
);

router.delete(
  "/:id",
  /*authenticator,*/ (req, res, next) => {
    const paramList = [req.params.id];
    queryHandler(QUERY_DELETE, paramList, res, next);
  }
);

export default router;
