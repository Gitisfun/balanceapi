import Authenticator from "../../logic/Authenticator.js";
import pool from "../config.js";
import Columns from "../constants/columns.js";
import BaseQueries from "../query/BaseQueries.js";

// TABLE NAME AND COLUMNS

const TABLE_NAME = "users";

const COLUMN_USERNAME = "username";
const COLUMN_PASSWORD = "password";
const COLUMN_FIRSTNAME = "firstname";
const COLUMN_LASTNAME = "lastname";

export const TABLE_NAME_USERS = "users";

// QUERIES

function QUERY_CREATE() {
  const COLUMNS = [COLUMN_PASSWORD, COLUMN_USERNAME, COLUMN_FIRSTNAME, COLUMN_LASTNAME];
  return BaseQueries.create(TABLE_NAME, COLUMNS);
}

function QUERY_MALIBU() {
  const QUERY = `SELECT ${Columns.ID}, ${COLUMN_USERNAME}, ${COLUMN_PASSWORD}, ${COLUMN_FIRSTNAME}, ${COLUMN_LASTNAME}, ${Columns.CREATED_AT} FROM ${TABLE_NAME} `;
  const WHERE = `WHERE UPPER(${COLUMN_USERNAME}) = UPPER(?) AND ${Columns.IS_ACTIVE} = 1`;
  return QUERY + WHERE;
}

// LOGIC

function findUser(user, response, next) {
  pool.query(QUERY_MALIBU(), [user.username], (err, results) => {
    if (err) {
      next(err);
    } else {
      const foundUser = results[0];

      if (foundUser == null) {
        response.status(404).send({
          msg: "Username not found",
          msg_nl: "Gebruikersnaam niet gevonden",
          status: false,
        });
      } else {
        Authenticator.comparer(user, foundUser, response, next);
      }
    }
  });
}

function checkIfUserAlreadyExists(user, response, next) {
  pool.query(QUERY_MALIBU(), [user.username], (err, results) => {
    if (err) {
      next(err);
    } else {
      if (results.length === 0) {
        response.send({ msg: "Ok", status: true });
      } else {
        response.status(409).send({
          msg: "User already exists",
          msg_nl: "Gebruikersnaam bestaat al",
          status: false,
        });
      }
    }
  });
}

export { QUERY_CREATE, findUser, checkIfUserAlreadyExists };
