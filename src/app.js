import express from "express";
import logger from "./helpers/logger";
import t from "./database/tables";

const app = express();
require("./startup/routes")(app);

t.createEnum();
t.createTableCustomers();
t.createTableFarmers();
t.createTableProfessional();
t.createTableInvestors();
t.createTableProjects();
t.createTableProducts();
t.createTableOrders();
t.createAdmin();

const port = process.env.PORT || 5000;
const server = app.listen(port, logger.info(`listening to port ${port}`));

module.exports = server;
