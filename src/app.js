import express from "express";
import logger from "./helpers/logger";
import tables from "./database/tables";

const app = express();
require("./startup/routes")(app);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/pages/index.html`);
});

app.get("/investors", (req, res) => {
  res.sendFile(`${__dirname}/pages/investor.html`);
});
tables.createTableProjects();
// tables.deleteTableInvestors();
// tables.createTableInvestors();

const port = process.env.PORT || 5000;
app.listen(port, logger.info(`listening to port ${port}`));
