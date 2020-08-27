import express from "express";
import morgan from "morgan";
import Products from "../endPoints/productRoutes";

require("express-async-errors");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env === "development") {
    app.use(morgan("tiny"));
  }
  app.use("/", Products);
};
