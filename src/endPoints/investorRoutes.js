import { Router } from "express";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import upload from "../images";

import Investor from "../contrallers/investorContrals";

const router = Router();

router.get("/", [auth, admin], Investor.getAllInvestor);

router.get("/:id", auth, Investor.getInvestorDetails);

router.delete("/:id", [auth, admin], Investor.removeSpecificInvestor);

router.patch("/:id/contact", auth, Investor.updateInvestorContact);

router.post("/register", upload.single("image"), Investor.registerInvestor);

router.post("/login", Investor.loginInvesttor);

export default router;
