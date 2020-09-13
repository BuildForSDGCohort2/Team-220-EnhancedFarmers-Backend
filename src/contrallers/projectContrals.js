import _ from "lodash";

import validate from "../validations/validateProjectInput";
import ProjectModel from "../database/models/projectQueries";
import Farmer from "../database/models/farmerQueries";
import Investor from "../database/models/investorsModel";
import Profesional from "../database/models/professionalQueries";

const ProjectContrals = {
  async registerProject(req, res) {
    const project = _.pick(req.body, ["farmer_id",
      "profesional_id", "investor_id", "product_category",
      "amount", "max_amount", "end_time", "description"]);

    const { error } = await validate.validateProjectCreation(project);
    if (error) {
      return res.status(400).send({ status: 400, message: error.details[0].message });
    }

    const checkFarmerAvailable = await Farmer.findFarmerUsingId(project.farmer_id);
    if (!checkFarmerAvailable.length) {
      return res.status(400).status({ status: 400, message: "Invalid farmer provided" });
    }

    const checkProfesionalAvailable = await Profesional.findProUsingId(project.profesional_id);
    if (!checkProfesionalAvailable.length) {
      return res.status(400).send({ status: 400, message: "Invalid Profesional Provided" });
    }

    const checkInvestorVailable = await Investor.findInvestorUsingId(project.investor_id);
    if (!checkInvestorVailable.length) {
      return res.status(400).send({ status: 400, message: "Invalid Investor Provided" });
    }

    const submitData = await ProjectModel.registerAproject(project);

    return res.status(201).send({ status: 201, data: submitData });
  },

  async deleteSpecificProject(req, res) {
    const projectId = req.params.id;

    if (!projectId) {
      return res.status(400).send({ status: 400, message: "Id mush be given" });
    }

    const checkProject = await ProjectModel.findProjectUsingId(projectId);
    if (!checkProject.length) {
      return res.status(404).send({ status: 404, message: "Project not found" });
    }

    await ProjectModel.deleteSpecificProject(projectId);

    return res.status(200).send({ status: 200, message: "Project deleted successfully" });
  },

  getSpecificProject: async (req, res) => {
    const projectId = req.params.id;

    const checkAvailableProject = await ProjectModel.getProjectById(projectId);
    console.log(checkAvailableProject);
    if (!checkAvailableProject.length) {
      return res.status(404).send({ status: 404, message: "Project of that id is not fount" });
    }

    return res.status(200).send({ status: 200, data: checkAvailableProject[0] });
  },

  async getProjectsSupervisedByTheSameProfessional(req, res) {
    const proId = req.params.id;

    if (!proId) {
      return res.status(404).send({ status: 404, message: "Id must Be Provided" });
    }

    const checkProfesionalAvailable = await Profesional.findProUsingId(proId);
    if (!checkProfesionalAvailable.length) {
      return res.status(400).send({ status: 400, message: "Invalid Profesional Provided" });
    }

    const getProjects = await ProjectModel.getProjectBySameProffesional(proId);
    if (!getProjects.length) {
      return res.status(404).send({ status: 404, message: "Project of that id is not fount" });
    }

    return res.status(200).send({ status: 200, data: getProjects[0] });
  },

};

export default ProjectContrals;
