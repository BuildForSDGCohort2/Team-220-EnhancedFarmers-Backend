import { Router } from "express";
// import admin from "../middlewares/admin";
// import auth from "../middlewares/auth";

import Professional from "../contrallers/professionalControls";
import upload from "../images";

const router = Router();

router.get("/", Professional.getAll);

router.get("/:id", Professional.getSpecificProfessionalUsingId);

router.delete("/:id", Professional.deleteAProfessuinal);

router.post(
  "/signup",
  upload.single("image"),
  Professional.createProfessionalAccount
);

router.post("/login", Professional.signInAprofessional);

export default router;
