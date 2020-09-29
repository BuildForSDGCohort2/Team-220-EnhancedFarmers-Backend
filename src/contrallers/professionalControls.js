import _ from "lodash";
import bcrypt from "bcrypt";

import Professionals from "../database/models/professionalQueries";
import Project from "../database/models/projectQueries";
import validate from "../validations/validateProfessionals";
import generateHash from "../helpers/generateHash";
import generateToken from "../helpers/genrateToken";

const Professional = {
  async getAll(req, res) {
    const getThem = await Professionals.fetchAllProfessionals();
    if (!getThem.length) {
      return res
        .status(400)
        .send({ status: 400, message: "No professionals yet" });
    }

    return res.status(200).send({ status: 200, data: getThem });
  },
  async createProfessionalAccount(req, res) {
    const professional = _.pick(req.body, [
      "email",
      "fname",
      "lname",
      "contact",
      "residence",
      "profession",
      "password",
    ]);

    const image = req.file;
    if (!image) {
      return res
        .status(400)
        .send({ status: 400, message: "Please select an image" });
    }

    const imageUrl = image.filename;

    const { error } = await validate.validateSignup(professional);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    // checking whether the professional is already registered
    const findProfession = await Professionals.findSpecificProfession(
      professional.email
    );

    if (findProfession) {
      return res
        .status(400)
        .send({ status: 400, message: "Professional already a  member" });
    }

    professional.password = await generateHash(
      professional.password,
      professional.email
    );
    // this is where we push the data to the datebase
    const regisiterProfessional = await Professionals.registerProfessional(
      professional,
      imageUrl
    );

    return res.status(201).send({
      status: 201,
      data: _.pick(regisiterProfessional, [
        "id",
        "email",
        "fname",
        "lname",
        "contact",
        "residence",
        "profession",
      ]),
    });
  },
  async signInAprofessional(req, res) {
    const loginInfo = _.pick(req.body, ["email", "password"]);

    const { error } = await validate.validateLogin(loginInfo);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const findProfessional = await Professionals.findSpecificProfession(
      loginInfo.email
    );

    if (!findProfessional) {
      return res
        .status(400)
        .send({ status: 400, message: "wrogle email or password" });
    }

    const { id, email, is_admin: isAdmin, password } = findProfessional;

    const isValid = await bcrypt.compare(loginInfo.password, password);
    if (!isValid) {
      return res
        .status(400)
        .send({ status: 400, message: "wrogle email or password" });
    }

    const token = await generateToken(id, email, isAdmin);

    return res
      .status(200)
      .header("x-access-token", token)
      .header("access-control-expose-headers", "x-access-token")
      .send({
        status: 200,
        token,
        data: _.pick(findProfessional[0], [
          "email",
          "fname",
          "lname",
          "contact",
          "residence",
          "profession",
        ]),
      });
  },
  async getSpecificProfessionalUsingId(req, res) {
    const proId = _.pick(req.params, ["id"]);

    const { error } = await validate.validateGetId(proId);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const getProfessional = await Professionals.findProUsingId(proId.id);

    if (!getProfessional.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Professional of that id is not found" });
    }

    return res.status(200).send({
      status: 200,
      data: _.pick(getProfessional[0], [
        "email",
        "fname",
        "lname",
        "contact",
        "residence",
        "profession",
        "imageurl",
      ]),
    });
  },

  async deleteAProfessuinal(req, res) {
    const proId = _.pick(req.params, ["id"]);

    const { error } = await validate.validateGetId(proId);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const getProfessional = await Professionals.findProUsingId(proId.id);
    if (!getProfessional.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Professional of that id is not found" });
    }

    const getProjectsByProfessional = await Project.getProjectBySameProffesional();
    console.log(getProjectsByProfessional);

    if (getProjectsByProfessional.length) {
      return res.status(400).send({
        status: 400,
        message: "you can delete a professtonal with projects running",
      });
    }

    await Professionals.removeAProfessionalFromDb(proId.id);

    return res
      .status(200)
      .send({ status: 200, message: "Professional removed successfully" });
  },
};

export default Professional;
