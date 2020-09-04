import { Router } from "express";

import upload from "../images";
import Farmer from "../contrallers/farmerContrals";

const router = Router();

router.get("/", Farmer.getAllFarmers);

router.post("/signup", upload.single("image"), Farmer.registerNewFarmer);

router.post("/login", Farmer.loginFarmer);

router.get("/:id", Farmer.getSpecificFarmerUsingId);

router.delete("/:id", Farmer.removeSpecificFarmer);

router.patch("/:id/approve", Farmer.adminAprroveAFarmer);

export default router;
