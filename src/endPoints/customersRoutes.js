import { Router } from "express";

import auth from "../middlewares/auth";
import Customer from "../contrallers/customerContrals";

import upload from "../images";

const router = Router();

router.post("/", upload.single("image"), Customer.registerNewCustomer);

router.post("/login", Customer.loginCustomer);

router.patch("/password", auth, Customer.changePassword);

export default router;
