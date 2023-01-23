import Logger from "../../middleware/logger/logger.js";
import Columns from "../constants/columns.js";
import QueryStrings from "./QueryStrings.js";

class BaseQueries {
  static selectAll(table_name, columns) {
    let QUERY = `SELECT ${Columns.ID}, `;
    for (let i = 0; i < columns.length; i++) {
      QUERY += `${columns[i]}, `;
    }
    QUERY += `${Columns.CREATED_AT}, ${Columns.UPDATED_AT}, ${Columns.DELETED_AT} FROM ${table_name} `;
    QUERY += `WHERE ${Columns.IS_ACTIVE} = 1 AND ${Columns.USER_ID} = ?`;
    Logger.info(QUERY);
    return QUERY;
  }

  static create(table_name, columns) {
    let QUERY = `INSERT INTO ${table_name} (`;
    for (let i = 0; i < columns.length; i++) {
      QUERY += `${columns[i]}`;
      if (i < columns.length - 1) {
        QUERY += ", ";
      }
    }
    QUERY += ") VALUES (";
    for (let i = 0; i < columns.length; i++) {
      QUERY += `?`;
      if (i < columns.length - 1) {
        QUERY += ", ";
      }
    }
    QUERY += ")";
    Logger.info(QUERY);
    return QUERY;
  }

  static select(table_name, columns) {
    const QUERY = `${this.selectAll(table_name, columns)} AND ${Columns.ID} = ?`;
    Logger.info(QUERY);
    return QUERY;
  }

  static update(table_name, columns) {
    let QUERY = `UPDATE ${table_name} SET `;
    for (let i = 0; i < columns.length; i++) {
      QUERY += `${columns[i]} = ?, `;
    }
    QUERY += `${Columns.UPDATED_AT} = NOW() WHERE ${Columns.ID} = ?`;
    Logger.info(QUERY);
    return QUERY;
  }

  static delete(table_name) {
    const QUERY = `UPDATE ${table_name} SET ${Columns.IS_ACTIVE} = 0, ${Columns.DELETED_AT} = NOW() WHERE ${Columns.ID} = ?`;
    Logger.info(QUERY);
    return QUERY;
  }

  static insertAll(table_name, columns) {
    let QUERY = `INSERT INTO ${table_name} (`;
    for (let i = 0; i < columns.length; i++) {
      QUERY += `${columns[i]}`;
      if (i < columns.length - 1) {
        QUERY += ", ";
      }
    }
    QUERY += ") VALUES ?";
    Logger.info(QUERY);
    return QUERY;
  }

  static count(table_name, fields) {
    const QUERY = `SELECT COUNT(*) AS 'total' FROM ${table_name} `;
    const WHERE = `WHERE ${Columns.IS_ACTIVE} = 1 AND ${Columns.USER_ID} = ? `;
    return QUERY + WHERE + QueryStrings.filtering(fields);
  }
}

export default BaseQueries;
