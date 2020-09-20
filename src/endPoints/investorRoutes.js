import { Router } from "express";

import upload from "../images";

import Investor from "../contrallers/investorContrals";

const router = Router();

router.get("/", Investor.getAllInvestor);

router.get("/:id", Investor.getInvestorDetails);

router.delete("/:id", Investor.removeSpecificInvestor);

router.patch("/:id/contact", Investor.updateInvestorContact);

router.post("/register", upload.single("image"), Investor.registerInvestor);

router.post("/login", Investor.loginInvesttor);

export default router;
