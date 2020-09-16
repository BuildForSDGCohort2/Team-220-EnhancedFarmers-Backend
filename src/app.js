import express from "express";
import logger from "./helpers/logger";

const app = express();
require("./startup/routes")(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, logger.info(`listening to port ${port}`));

export default server;
