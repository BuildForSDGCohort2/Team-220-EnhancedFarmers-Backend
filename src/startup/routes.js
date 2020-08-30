import express from "express";
import morgan from "morgan";
import Products from "../endPoints/productRoutes";
import Proffessional from "../endPoints/professionalRoutes";

require("express-async-errors");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
  }
  app.use("/products", Products);
  app.use("/professional", Proffessional);
};
