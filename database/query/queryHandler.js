import pool from "../config.js";
import responseHandler from "../../logic/responseHandler.js";

export default function queryHandler(query, paramList, response, next) {
  pool.query(query(), paramList, (err, results) => {
    responseHandler(err, results, response, next);
  });
}
