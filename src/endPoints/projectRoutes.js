import { Router } from "express";

import Projects from "../contrallers/projectContrals";

const router = Router();

router.post("/create", Projects.registerProject);

router.get("/", Projects.fetchAllProjects);

router.get("/:id", Projects.getSpecificProject);

router.get("/:id/professionals", Projects.getProjectsSupervisedByTheSameProfessional);

router.delete("/:id", Projects.deleteSpecificProject);

export default router;
