import { Router } from "express";
import admin from "../middlewares/admin";
import auth from "../middlewares/auth";

import Professional from "../contrallers/professionalControls";
import upload from "../images";

const router = Router();

router.get("/", [auth, admin], Professional.getAll);

router.get("/:id", auth, Professional.getSpecificProfessionalUsingId);

router.delete("/:id", [auth, admin], Professional.deleteAProfessuinal);

router.post(
  "/signup",
  [upload.single("image"), auth, admin],
  Professional.createProfessionalAccount
);

router.post("/login", Professional.signInAprofessional);

export default router;
