import Columns from "../constants/columns.js";
import BaseQueries from "../query/BaseQueries.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "categories";

const COLUMN_NAME = "name";
const COLUMN_ICON = "icon";

// JOIN

export const TABLE_NAME_CATEGORIES = "categories";

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
