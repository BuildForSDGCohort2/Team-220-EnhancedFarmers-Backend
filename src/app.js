import express from "express";
import path from "path";
import logger from "./helpers/logger";
// import t from "./database/tables";

const app = express();
require("./startup/routes")(app);

app.use("/uploads", express.static(path.resolve(`${__dirname}/../uploads`)));

const port = process.env.PORT || 5000;
const server = app.listen(port, logger.info(`listening to port ${port}`));

module.exports = server;
