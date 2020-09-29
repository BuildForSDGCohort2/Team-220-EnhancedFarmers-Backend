import config from "config";
import { Pool } from "pg";
import logger from "../helpers/logger";

const pool = new Pool({
  connectionString: config.get("db"),
});

pool.connect((err, res) => {
  if (err) {
    logger.info("Please check your connection");
  } else if (res) {
    logger.info(`Connected to ${process.env.NODE_ENV} database `);
  }
});
export default pool;
