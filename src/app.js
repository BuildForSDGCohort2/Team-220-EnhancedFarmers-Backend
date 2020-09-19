import express from "express";
import logger from "./helpers/logger";
import t from "./database/tables";

const app = express();
require("./startup/routes")(app);

t.createTableCustomers();

const port = process.env.PORT || 5000;
const server = app.listen(port, logger.info(`listening to port ${port}`));

module.exports = server;
