import { Router } from "express";

import Professional from "../contrallers/professionalControls";

const router = Router();

router.get("/", Professional.getAll);
router.get("/:id", Professional.getSpecificProfessionalUsingId);
router.delete("/:id", Professional.deleteAProfessuinal);
router.post("/signup", Professional.createProfessionalAccount);
router.post("/login", Professional.signInAprofessional);

export default router;
