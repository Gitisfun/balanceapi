import { COLUMN_PRICE, COLUMN_TYPE } from "../tables/transactions.js";

class StatisticsStates {
  static INCOME = 1;
  static EXPENSES = 0;

  static SUM = 3;
  static TOTAL = 4;
  static AVERAGE = 5;

  static getSelectQuery(mode) {
    if (mode === StatisticsStates.TOTAL) return "COUNT(*)";
    if (mode === StatisticsStates.SUM) return `SUM(${COLUMN_PRICE})`;
    if (mode === StatisticsStates.AVERAGE) return `AVG(${COLUMN_PRICE})`;
    return null;
  }

  static getWhereQuery(mode) {
    if (mode === StatisticsStates.INCOME) return ` AND ${COLUMN_TYPE} = 1`;
    if (mode === StatisticsStates.EXPENSES) return ` AND ${COLUMN_TYPE} = 0`;
    return null;
  }
}

export default StatisticsStates;
