import pool from "../../database/config.js";
import Transaction from "../../logic/Transaction.js";
import Bulk from "../../logic/Bulk.js";
import responseHandler from "../../logic/responseHandler.js";
import { QUERY_DELETE } from "../tables/transactions.js";
import { QUERY_DELETE_BY_TRANSACTION_ID } from "../tables/transactionProducts.js";

class MultipleController {
  static create(table_name, params, queries, req, response, next) {
    Transaction.begin(pool, next, (connection) => {
      // Create transaction
      connection.query(queries.create, params, (err, resultsObject) => {
        if (err || !resultsObject) return Transaction.checkForRollback(connection, err, next);

        const IDs = {
          transactionId: resultsObject.insertId,
          userId: req.userId,
        };

        const paramsList = Bulk.createTransactionProducts(req.body.products, IDs);

        // Create transaction products list
        connection.query(queries.list, [paramsList], (err, resultsList) => {
          if (err) return Transaction.checkForRollback(connection, err, next);

          Transaction.commit(connection, next, () => responseHandler(err, resultsList, response, next));
        });
      });
    });
  }

  static deleteTransaction(paramList, req, res, next) {
    try {
      Transaction.begin(pool, next, (connection) => {
        connection.query(QUERY_DELETE(), paramList, (err, resOne) => {
          if (err) return Transaction.checkForRollback(connection, err, next);

          connection.query(QUERY_DELETE_BY_TRANSACTION_ID(), paramList, (err, resTwo) => {
            if (err) return Transaction.checkForRollback(connection, err, next);

            Transaction.commit(connection, next, () => responseHandler(err, resTwo, res, next));
          });
        });
      });
    } catch (err) {
      next(err);
    }
  }
}

export default MultipleController;
