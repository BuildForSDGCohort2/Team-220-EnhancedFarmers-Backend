import { Router } from "express";

import Professional from "../contrallers/professionalControls";
import upload from "../images";

const router = Router();

router.get("/", Professional.getAll);

router.get("/:id", Professional.getSpecificProfessionalUsingId);

router.delete("/:id", Professional.deleteAProfessuinal);

router.post("/signup", upload.single("image"), Professional.createProfessionalAccount);

router.post("/login", Professional.signInAprofessional);

export default router;
