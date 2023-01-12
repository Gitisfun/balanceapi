import mysql from "mysql";

/*
const config = {
  host: process.env.CO_HOST,
  user: process.env.CO_USER,
  password: process.env.CO_PASSWORD,
  database: process.env.CO_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  supportBigNumbers: true,
  bigNumberStrings: true,
  timezone: process.env.CO_TIMEZONE,
};
*/

const config = {
  host: "localhost",
  user: "root",
  port: "3306",
  password: "pokemon1993",
  database: "balance",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  supportBigNumbers: true,
  bigNumberStrings: true,
  timezone: process.env.CO_TIMEZONE,
};

const pool = mysql.createPool(config);

export default pool;
