import Columns from "../constants/columns.js";
import BaseQueries from "../query/BaseQueries.js";
import QueryStrings from "../query/QueryStrings.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "products";

const COLUMN_NAME = "name";
const COLUMN_DESCRIPTION = "description";
const COLUMN_BRAND = "brand";
const COLUMN_CATEGORY_ID = "categoryId";

// JOIN

export const TABLE_NAME_PRODUCTS = "products";

// QUERIES

function QUERY_GET_ALL() {
  const fields = ["name", "description", "brand"];

  const COLUMNS = [COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND];
  const base = BaseQueries.selectAll(TABLE_NAME, COLUMNS);
  const filtering = QueryStrings.all(fields, COLUMN_NAME, "ASC");
  return base + " " + filtering;
}

function QUERY_COUNT() {
  const fields = ["name", "description", "brand"];

  return BaseQueries.count(TABLE_NAME, fields);
}

function QUERY_GET() {
  const COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND, COLUMN_CATEGORY_ID];
  return BaseQueries.select(TABLE_NAME, COLUMNS);
}

function QUERY_CREATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND, COLUMN_CATEGORY_ID, Columns.USER_ID];
  return BaseQueries.create(TABLE_NAME, COLUMNS);
}

function QUERY_UPDATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND, COLUMN_CATEGORY_ID];
  return BaseQueries.update(TABLE_NAME, COLUMNS);
}

function QUERY_DELETE() {
  return BaseQueries.delete(TABLE_NAME);
}

export { QUERY_GET, QUERY_COUNT, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE };
