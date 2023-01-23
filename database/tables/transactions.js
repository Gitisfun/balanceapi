import Columns from "../constants/columns.js";
import BaseQueries from "../query/BaseQueries.js";
import QueryStrings from "../query/QueryStrings.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "transactions";

const COLUMN_NAME = "name";
const COLUMN_PRICE = "price";
const COLUMN_DESCRIPTION = "description";
const COLUMN_DATE = "date";
const COLUMN_TYPE = "type";

// JOIN

export const TABLE_NAME_TRANSACTIONS = "transactions";

// QUERIES

function QUERY_GET_ALL() {
  const fields = ["name", "description"];

  const COLUMNS = [COLUMN_NAME, COLUMN_PRICE, COLUMN_DESCRIPTION, COLUMN_DATE, COLUMN_TYPE];
  const base = BaseQueries.selectAll(TABLE_NAME, COLUMNS);
  const filtering = QueryStrings.all(fields, COLUMN_DATE, "DESC");
  return base + " " + filtering;
}

function QUERY_COUNT() {
  const fields = ["name", "description"];

  return BaseQueries.count(TABLE_NAME, fields);
}

function QUERY_GET() {
  const COLUMNS = [COLUMN_NAME, COLUMN_PRICE, COLUMN_DESCRIPTION, COLUMN_DATE, COLUMN_TYPE];
  return BaseQueries.select(TABLE_NAME, COLUMNS);
}

function QUERY_CREATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_PRICE, COLUMN_DESCRIPTION, COLUMN_DATE, COLUMN_TYPE, Columns.USER_ID];
  return BaseQueries.create(TABLE_NAME, COLUMNS);
}

function QUERY_UPDATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_PRICE, COLUMN_DESCRIPTION, COLUMN_DATE, COLUMN_TYPE];
  return BaseQueries.update(TABLE_NAME, COLUMNS);
}

function QUERY_DELETE() {
  return BaseQueries.delete(TABLE_NAME);
}

export { QUERY_GET, QUERY_COUNT, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE };
