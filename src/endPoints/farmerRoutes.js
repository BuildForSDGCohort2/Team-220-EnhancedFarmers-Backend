import { Router } from "express";

import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

import upload from "../images";
import Farmer from "../contrallers/farmerContrals";

const router = Router();

router.get("/", auth, Farmer.getAllFarmers);

router.post("/signup", upload.single("image"), Farmer.registerNewFarmer);

router.post("/login", Farmer.loginFarmer);

router.get("/:id", auth, Farmer.getSpecificFarmerUsingId);

router.delete("/:id", [auth, admin], Farmer.removeSpecificFarmer);

router.patch("/:id/approve", [auth, admin], Farmer.adminAprroveAFarmer);

export default router;
