import express from "express";
import logger from "./helpers/logger";
// import tables from "./database/tables";

const app = express();
require("./startup/routes")(app);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// tables.createTableFarmers();
// tables.createTableProducts();
// tables.createTableProfessional();

const port = process.env.PORT || 5000;
app.listen(port, logger.info(`listening to port ${port}`));
