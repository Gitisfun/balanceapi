import pool from "../config.js";
import responseHandler from "../../logic/responseHandler.js";

export default function queryHandler(query, paramList, response, next) {
  console.log("A");
  pool.query(query(), paramList, (err, results) => {
    console.log("B");
    responseHandler(err, results, response, next);
  });
}
