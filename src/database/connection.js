import mysql from "mysql";
import config from "config";

import logger from "../helpers/logger";

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("dbname"),
  multipleStatements: true,
});

module.exports.connect = pool.getConnection((err, connection) => {
  if (err) {
    return logger.info("we could not connect to the database", err);
  }

  if (connection) {
    return logger.info("We successfully connected to the database");
  }
});

module.exports = pool;
