import Columns from "../constants/columns.js";

class QueryStrings {
  static all(fields, sort_field, sort_order, table_name = null) {
    return this.filtering(fields, table_name) + this.sorting(sort_field, sort_order) + this.pagination();
  }

  static filtering(fields, table_name) {
    let QUERY = "AND concat(";
    for (let i = 0; i < fields.length; i++) {
      if (table_name) {
        QUERY += `${table_name}.${fields[i]}`;
      } else {
        QUERY += `${fields[i]}`;
      }
      if (i < fields.length - 1) {
        QUERY += ", ";
      }
    }
    QUERY += ") LIKE concat('%', ?, '%') ";
    return QUERY;
  }

  static sorting(field, order) {
    return `ORDER BY ${field} ${order} `;
  }

  static pagination() {
    return "LIMIT ? OFFSET ? ";
  }

  static SELECT_JOIN_BASE(table_name, columns) {
    this.TIME_OPERATIONS(columns);

    let QUERY = "SELECT ";
    for (let i = 0; i < columns.length; i++) {
      QUERY += `${table_name}.${columns[i]}`;
      if (i < columns.length - 1) {
        QUERY += ", ";
      }
    }
    return QUERY;
  }

  static SELECT_JOIN_OTHER(table_name, columns, aliases) {
    let QUERY = ", ";
    for (let i = 0; i < columns.length; i++) {
      QUERY += `${table_name}.${columns[i]} "${aliases[i]}"`;
      if (i < columns.length - 1) {
        QUERY += ", ";
      }
    }
    return QUERY + " ";
  }

  static JOIN(table_one_name, table_two_name, table_two_column) {
    return `LEFT JOIN ${table_one_name} ON ${table_two_name}.${table_two_column} = ${table_one_name}.${Columns.ID} `;
  }

  static FROM(table_name) {
    return `FROM ${table_name} `;
  }

  static WHERE_USER_ID(table_name) {
    return `WHERE ${table_name}.${Columns.IS_ACTIVE} = 1 AND ${table_name}.${Columns.USER_ID} = ? `;
  }

  static WRAPPER_BY_ID(table_name, query) {
    return (query += ` AND ${table_name}.${Columns.ID} = ? `);
  }

  static WHERE(table_name, column) {
    if (table_name) return `WHERE ${table_name}.${column} = ? `;
    return `WHERE ${column} = ? `;
  }

  static TIME_OPERATIONS(list) {
    list.push(Columns.CREATED_AT, Columns.UPDATED_AT, Columns.DELETED_AT);
  }
}

export default QueryStrings;
