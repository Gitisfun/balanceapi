import Columns from "../constants/columns.js";
import BaseQueries from "../query/BaseQueries.js";
//import QueryStrings from "../query/QueryStrings.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "balances";

const COLUMN_NAME = "name";
const COLUMN_TYPE = "type";
const COLUMN_AMOUNT = "amount";

// JOIN

export const TABLE_NAME_BALANCES = "balances";

// QUERIES

function QUERY_GET_ALL() {
  const COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_TYPE, COLUMN_AMOUNT];
  return BaseQueries.selectAll(TABLE_NAME, COLUMNS);
}

function QUERY_GET() {
  const COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_TYPE, COLUMN_AMOUNT];
  return BaseQueries.select(TABLE_NAME, COLUMNS);
}

function QUERY_CREATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_TYPE, COLUMN_AMOUNT, Columns.USER_ID];
  return BaseQueries.create(TABLE_NAME, COLUMNS);
}

function QUERY_UPDATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_TYPE, COLUMN_AMOUNT];
  return BaseQueries.update(TABLE_NAME, COLUMNS);
}

function QUERY_DELETE() {
  return BaseQueries.delete(TABLE_NAME);
}

export { QUERY_GET, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE };
