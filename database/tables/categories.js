import Columns from "../constants/columns.js";
import BaseQueries from "../query/BaseQueries.js";
import QueryStrings from "../query/QueryStrings.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "categories";

const COLUMN_NAME = "name";
const COLUMN_ICON = "icon";

// JOIN

export const TABLE_NAME_CATEGORIES = "categories";

const CATEGORY_ALIAS_ID = "category_id";
const CATEGORY_ALIAS_NAME = "category_name";
const CATEGORY_ALIAS_ICON = "category_icon";

const CATEGORY_COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_ICON];
const CATEGORY_ALIASES = [CATEGORY_ALIAS_ID, CATEGORY_ALIAS_NAME, CATEGORY_ALIAS_ICON];

export const CATEGORY_JOIN_SELECT = () => QueryStrings.SELECT_JOIN_OTHER(TABLE_NAME_CATEGORIES, CATEGORY_COLUMNS, CATEGORY_ALIASES);
export const CATEGORY_JOIN = (table_name, column) => QueryStrings.JOIN(TABLE_NAME_CATEGORIES, table_name, column);

// QUERIES

function QUERY_GET_ALL() {
  const COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_ICON];
  return BaseQueries.selectAll(TABLE_NAME, COLUMNS);
}

function QUERY_GET() {
  const COLUMNS = [Columns.ID, COLUMN_NAME, COLUMN_ICON];
  return BaseQueries.select(TABLE_NAME, COLUMNS);
}

function QUERY_CREATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_ICON, Columns.USER_ID];
  return BaseQueries.create(TABLE_NAME, COLUMNS);
}

function QUERY_UPDATE() {
  const COLUMNS = [COLUMN_NAME, COLUMN_ICON];
  return BaseQueries.update(TABLE_NAME, COLUMNS);
}

function QUERY_DELETE() {
  return BaseQueries.delete(TABLE_NAME);
}

export { QUERY_GET, QUERY_GET_ALL, QUERY_CREATE, QUERY_UPDATE, QUERY_DELETE };
