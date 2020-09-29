import { Router } from "express";

import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import Customer from "../contrallers/customerContrals";

import upload from "../images";

const router = Router();

router.get("/", Customer.getAllCustomers);

router.get("/:id", Customer.getSingleCustomer);

router.delete("/:id", [auth, admin], Customer.deleteAcustomer);

router.post("/", upload.single("image"), Customer.registerNewCustomer);

router.post("/login", Customer.loginCustomer);

router.patch("/password", Customer.changePassword);

router.patch("/image", auth, Customer.updateCustomerImage);

export default router;
