import express from "express";
import cors from 'cors'
import morgan from "morgan";
import Products from "../endPoints/productRoutes";
import Proffessional from "../endPoints/professionalRoutes";
import Farmers from "../endPoints/farmerRoutes";
import Investor from "../endPoints/investorRoutes";
import Projects from "../endPoints/projectRoutes";

require("express-async-errors");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors())
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
  }
  app.use("/products", Products);
  app.use("/professionals", Proffessional);
  app.use("/farmers", Farmers);
  app.use("/investors", Investor);
  app.use("/projects", Projects);
};
