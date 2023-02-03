import Columns from "../constants/columns.js";
import BaseQueries from "../query/BaseQueries.js";
import QueryStrings from "../query/QueryStrings.js";
import { CATEGORY_JOIN, CATEGORY_JOIN_SELECT } from "./categories.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "products";

const COLUMN_NAME = "name";
const COLUMN_DESCRIPTION = "description";
const COLUMN_BRAND = "brand";
const COLUMN_WEIGHT_TYPE = "weightType";
export const COLUMN_CATEGORY_ID = "categoryId";

// JOIN

export const TABLE_NAME_PRODUCTS = "products";

const PRODUCTS_ALIAS_ID = "product_id";
const PRODUCTS_ALIAS_NAME = "product_name";
const PRODUCTS_ALIAS_BRAND = "product_brand";
const PRODUCTS_ALIAS_DESCRIPTION = "product_description";
const PRODUCTS_ALIAS_WEIGHT_TYPE = "product_weight_type";

const PRODUCTS_COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_BRAND, COLUMN_DESCRIPTION, COLUMN_WEIGHT_TYPE];
const PRODUCTS_ALIASES = [PRODUCTS_ALIAS_ID, PRODUCTS_ALIAS_NAME, PRODUCTS_ALIAS_BRAND, PRODUCTS_ALIAS_DESCRIPTION, PRODUCTS_ALIAS_WEIGHT_TYPE];

export const PRODUCTS_JOIN_SELECT = () => QueryStrings.SELECT_JOIN_OTHER(TABLE_NAME_PRODUCTS, PRODUCTS_COLUMNS, PRODUCTS_ALIASES);
export const PRODUCTS_JOIN = (table_name, column) => QueryStrings.JOIN(TABLE_NAME_PRODUCTS, table_name, column);

// QUERIES

function QUERY_GET_ALL() {
  const fields = ["name", "description", "brand"];
  const COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND, COLUMN_WEIGHT_TYPE];

  let QUERY = QueryStrings.SELECT_JOIN_BASE(TABLE_NAME, COLUMNS);
  QUERY += CATEGORY_JOIN_SELECT();
  QUERY += QueryStrings.FROM(TABLE_NAME);
  QUERY += CATEGORY_JOIN(TABLE_NAME, COLUMN_CATEGORY_ID);
  QUERY += QueryStrings.WHERE_USER_ID(TABLE_NAME);
  QUERY += QueryStrings.all(fields, COLUMN_NAME, "ASC", TABLE_NAME);

  return QUERY;
}

function QUERY_COUNT() {
  const fields = ["name", "description", "brand"];

  return BaseQueries.count(TABLE_NAME, fields);
}

function QUERY_GET() {
  const COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND, COLUMN_CATEGORY_ID, COLUMN_WEIGHT_TYPE];
  return BaseQueries.select(TABLE_NAME, COLUMNS);
}

function QUERY_CREATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND, COLUMN_CATEGORY_ID, COLUMN_WEIGHT_TYPE, Columns.USER_ID];
  return BaseQueries.create(TABLE_NAME, COLUMNS);
}

function QUERY_UPDATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_DESCRIPTION, COLUMN_BRAND, COLUMN_CATEGORY_ID, COLUMN_WEIGHT_TYPE];
  return BaseQueries.update(TABLE_NAME, COLUMNS);
}

function QUERY_DELETE() {
  return BaseQueries.delete(TABLE_NAME);
}

export { QUERY_GET, QUERY_COUNT, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE };
