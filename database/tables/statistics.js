import ParamsBuilder from "../../logic/ParamBuilder.js";
import StatisticsStates from "../query/StatisticsStates.js";
import queryHandler from "../query/queryHandler.js";
import Columns from "../constants/columns.js";
import DateHelper from "../../logic/date.js";
import { COLUMN_DATE } from "./transactions.js";

class Statistics {
  static BASIC_WHERE = ` AND ${Columns.IS_ACTIVE} = 1 AND ${Columns.USER_ID} = ?`;

  static TIME_PERIOD(req) {
    let date = `${COLUMN_DATE} = ?`;

    if (req?.query?.period === "week") date = `DATE(transactions.${COLUMN_DATE}) BETWEEN '${DateHelper.getStartOfWeek(req.query.date)}' AND '${DateHelper.getEndOfWeek(req.query.date)}'`;
    if (req?.query?.period === "month") date = `MONTH(transactions.${COLUMN_DATE}) = ${DateHelper.getMonth(req.query.date)} AND YEAR(transactions.${COLUMN_DATE}) = ${DateHelper.getYear(req.query.date)}`;
    if (req?.query?.period === "year") date = `YEAR(transactions.${COLUMN_DATE}) = ${DateHelper.getYear(req.query.date)}`;

    return date;
  }

  static generic_period(type, req, res, next) {
    const paramList = ParamsBuilder.period(req);
    let query = `
    SELECT
      (SELECT COUNT(*) FROM transactions WHERE DATE(${COLUMN_DATE}) BETWEEN ? AND ?  AND type = ${type} ${Statistics.BASIC_WHERE}) AS "total",
      (SELECT SUM(price) FROM transactions WHERE DATE(${COLUMN_DATE}) BETWEEN ? AND ?  AND type = ${type} ${Statistics.BASIC_WHERE}) AS "sum",
      (SELECT AVG(price) FROM transactions WHERE DATE(${COLUMN_DATE}) BETWEEN ? AND ?  AND type = ${type} ${Statistics.BASIC_WHERE}) AS "average"`;

    queryHandler(
      () => {
        return query;
      },
      paramList,
      res,
      next
    );
  }

  static generic_week(type, req, res, next) {
    const dates = DateHelper.getDaysInWeek(req.query.date);
    const paramList = ParamsBuilder.range(req, dates);

    let query = "SELECT ";

    for (let i = 0; i < 7; i++) {
      query += `(SELECT SUM(price) FROM transactions WHERE DATE(${COLUMN_DATE}) = ? AND type = ${type} ${Statistics.BASIC_WHERE}) AS "${i + 1}"`;

      if (i + 1 < dates.length) {
        query += ", ";
      }
    }

    queryHandler(
      () => {
        return query;
      },
      paramList,
      res,
      next
    );
  }

  static generic_month(type, req, res, next) {
    const dates = DateHelper.getDaysInMonth(req.query.date);
    const paramList = ParamsBuilder.range(req, dates);

    let query = "SELECT ";

    for (let i = 0; i < dates.length; i++) {
      query += `(SELECT SUM(price) FROM transactions WHERE DATE(${COLUMN_DATE}) = ? AND type = ${type} ${Statistics.BASIC_WHERE}) AS "${i + 1}"`;

      if (i + 1 < dates.length) {
        query += ", ";
      }
    }

    queryHandler(
      () => {
        return query;
      },
      paramList,
      res,
      next
    );
  }

  static generic_year(type, req, res, next) {
    const paramList = ParamsBuilder.rangeYear(req);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let query = "SELECT ";

    for (let i = 0; i < months.length; i++) {
      const month = i + 1;
      query += `(SELECT SUM(price) FROM transactions WHERE MONTH(${COLUMN_DATE}) = ${month} AND YEAR(${COLUMN_DATE}) = ? AND type = ${type} ${Statistics.BASIC_WHERE}) AS "${months[i]}"`;

      if (i + 1 < months.length) {
        query += ", ";
      }
    }

    queryHandler(
      () => {
        return query;
      },
      paramList,
      res,
      next
    );
  }

  static generic_products(type, req, res, next) {
    const DATE = Statistics.TIME_PERIOD(req);
    const paramList = [req.userId];

    let query = `
    SELECT SUM(transactionproducts.price) AS "total", products.name
    FROM transactionproducts
    INNER JOIN products ON transactionproducts.productId = products.id
    INNER JOIN transactions ON transactionproducts.transactionId = transactions.id
    WHERE ${DATE} AND transactions.type = ${type}
    AND transactionproducts.userId = ? AND transactionproducts.isActive = 1
    GROUP BY transactionproducts.productId
    ORDER BY total DESC
    LIMIT 10
     `;

    queryHandler(
      () => {
        return query;
      },
      paramList,
      res,
      next
    );
  }
  static generic_categories(type, req, res, next) {
    const DATE = Statistics.TIME_PERIOD(req);
    const paramList = [req.userId];

    let query = `
      SELECT SUM(transactionproducts.price) AS "total", categories.name
      FROM transactionproducts
      INNER JOIN products ON transactionproducts.productId = products.id
      INNER JOIN categories ON products.categoryId = categories.id
      INNER JOIN transactions ON transactionproducts.transactionId = transactions.id
      WHERE ${DATE} AND transactions.type = ${type}
      AND transactionproducts.userId = ? AND transactionproducts.isActive = 1
      GROUP BY categories.name
     `;

    queryHandler(
      () => {
        return query;
      },
      paramList,
      res,
      next
    );
  }

  static generic_shops(type, req, res, next) {
    const DATE = Statistics.TIME_PERIOD(req);
    const paramList = [req.userId];

    let query = `
    SELECT SUM(price) as "total", shop
    FROM transactions
    WHERE ${DATE} AND transactions.type = ${type}
    AND transactions.userId = ? AND transactions.isActive = 1
    GROUP BY shop
     `;

    queryHandler(
      () => {
        return query;
      },
      paramList,
      res,
      next
    );
  }

  // QUERIES
  static transactions_period_income(req, res, next) {
    this.generic_period(StatisticsStates.INCOME, req, res, next);
  }
  static transactions_period_expenses(req, res, next) {
    this.generic_period(StatisticsStates.EXPENSES, req, res, next);
  }
  static transactions_week_income(req, res, next) {
    this.generic_week(StatisticsStates.INCOME, req, res, next);
  }
  static transactions_week_expenses(req, res, next) {
    this.generic_week(StatisticsStates.EXPENSES, req, res, next);
  }
  static transactions_month_income(req, res, next) {
    this.generic_month(StatisticsStates.INCOME, req, res, next);
  }
  static transactions_month_expenses(req, res, next) {
    this.generic_month(StatisticsStates.EXPENSES, req, res, next);
  }
  static transactions_year_income(req, res, next) {
    this.generic_year(StatisticsStates.INCOME, req, res, next);
  }
  static transactions_year_expenses(req, res, next) {
    this.generic_year(StatisticsStates.EXPENSES, req, res, next);
  }
  static products_income(req, res, next) {
    this.generic_products(StatisticsStates.INCOME, req, res, next);
  }
  static products_expenses(req, res, next) {
    this.generic_products(StatisticsStates.EXPENSES, req, res, next);
  }
  static categories_income(req, res, next) {
    this.generic_categories(StatisticsStates.INCOME, req, res, next);
  }
  static categories_expenses(req, res, next) {
    this.generic_categories(StatisticsStates.EXPENSES, req, res, next);
  }
  static shops_expenses(req, res, next) {
    this.generic_shops(StatisticsStates.EXPENSES, req, res, next);
  }
}

export default Statistics;
