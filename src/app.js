import express from "express";
import logger from "./helpers/logger";
import tables from "./database/tables";

const app = express();
require("./startup/routes")(app);

tables.createTableFarmers();
tables.createTableProducts();
console.log(process.env.NODE_ENV);
const port = process.env.PORT || 5000;
app.listen(port, logger.info(`listening to port ${port}`));
