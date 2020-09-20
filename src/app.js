import express from "express";
import logger from "./helpers/logger";
import t from "./database/tables";

const app = express();
require("./startup/routes")(app);

t.createTableProfessional();
t.createTableFarmers();
t.createTableInvestors();
t.createTableProjects();
// t.createTableProducts();
// t.createTableCustomers();

const port = process.env.PORT || 5000;
socket = io.listen(process.env.PORT);
const server = app.listen(port, logger.info(`listening to port ${port}`));

module.exports = server;
