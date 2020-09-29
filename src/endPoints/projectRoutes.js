import { Router } from "express";

import auth from "../middlewares/auth";
import admin from "../middlewares/admin";

import Projects from "../contrallers/projectContrals";

const router = Router();

router.post("/create", auth, Projects.registerProject);

router.get("/", auth, Projects.fetchAllProjects);

router.get("/:id", Projects.getSpecificProject);

router.get(
  "/:id/professional",
  auth,
  Projects.getProjectsSupervisedByTheSameProfessional
);

router.delete("/:id", [auth, admin], Projects.deleteSpecificProject);

export default router;
