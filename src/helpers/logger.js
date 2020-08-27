import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [new winston.transports.Console({ prettyPrint: true })],
});

module.exports = logger;
