import _ from "lodash";
import bcrypt from "bcrypt";

import Farmer from "../database/models/farmerQueries";
import generateHash from "../helpers/generateHash";
import generateToken from "../helpers/generateTokenFarmers";
import validate from "../validations/validateFarmerInput";

const FarmerContrals = {
  async getAllFarmers(req, res) {
    const allFarmers = await Farmer.fetchAllFarmers();
    if (!allFarmers.length) { return res.status(400).send({ status: 400, message: "No farmers yet" }); }

    return res.status(200).send({ status: 200, data: allFarmers });
  },
  registerNewFarmer: async (req, res) => {
    const farmer = _.pick(req.body, [
      "email",
      "fname",
      "lname",
      "contact",
      "location",
      "password",
    ]);

    // capturing the image loaded by the farmer
    const image = await req.file;
    if (!image) { return res.status(400).send({ status: 400, message: "Please select sn image" }); }
    const imageUrl = image.path;

    const { error } = await validate.validateSignup(farmer);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    // checking whether the farmer is already registered
    const findFarmer = await Farmer.findSpecificFarmer(farmer.email);
    if (findFarmer.length) {
      return res
        .status(400)
        .send({ status: 400, message: "farmer already a  member" });
    }

    farmer.password = await generateHash(farmer.password, farmer.email);
    // this is where we push the data to the datebase
    const regisiterfarmer = await Farmer.registerFarmer(farmer, imageUrl);

    const { id, email, is_accepted: isAccepted } = regisiterfarmer;

    const token = await generateToken(id, email, isAccepted);

    return res
      .status(201)
      .header("x-access-token", token)
      .header("access-control-expose-headers", "x-access-token")
      .send({
        status: 201,
        token,
        data: _.pick(regisiterfarmer, [
          "id",
          "email",
          "fname",
          "lname",
          "contact",
          "location",
          "imageUrl",
        ]),
      });
  },
  async loginFarmer(req, res) {
    const loginInfo = _.pick(req.body, ["email", "password"]);

    const { error } = await validate.validateLogin(loginInfo);
    if (error) {
      return res.status(400).send({ status: 400, message: error.details[0].message });
    }

    const findFarmer = await Farmer.findSpecificFarmer(loginInfo.email);
    if (!findFarmer.length) {
      return res.status(400).send({ status: 400, message: "wrogle email or password" });
    }

    const {
      id, email, is_admin: isAdmin, password,
    } = findFarmer[0];

    const isValid = await bcrypt.compare(loginInfo.password, password);
    if (!isValid) {
      return res.status(400).send({ status: 400, message: "wrogle email or password" });
    }

    const token = await generateToken(id, email, isAdmin);

    return res.status(200)
      .header("x-access-token", token)
      .header("access-control-expose-headers", "x-access-token")
      .send({
        status: 200,
        token,
        data: _.omit(findFarmer[0], ["password"]),
      });
  },
  async getSpecificFarmerUsingId(req, res) {
    const farmerId = _.pick(req.params, ["id"]);

    if (!farmerId) {
      return res
        .status(400)
        .send({ status: 400, message: " farmer id must be given" });
    }

    const getFarmer = await Farmer.findFarmerUsingId(farmerId.id);
    if (!getFarmer.length) {
      return res
        .status(404)
        .send({ status: 404, message: "farmer of that id is not found" });
    }

    return res.status(200).send({
      status: 200,
      data: _.omit(getFarmer[0], ["password", "registered_at"]),
    });
  },
  async adminAprroveAFarmer(req, res) {
    const isAccepted = _.pick(req.body, ["is_accepted"]);
    const farmerId = req.params.id;

    const { error } = await validate.validateApproveFarmer(isAccepted);
    if (error) { return res.status(400).send({ status: 400, message: error.details[0].message }); }

    const checkFarmer = await Farmer.findFarmerUsingId(farmerId);
    if (!checkFarmer.length) {
      return res
        .status(404)
        .send({ status: 404, message: "farmer of that id is not found" });
    }
    if (isAccepted.is_accepted === true) isAccepted.is_accepted = 1;
    else isAccepted.is_accepted = 0;

    await Farmer.approveFarmerToMember(farmerId, isAccepted.is_accepted);

    return res.status(200).send({ status: 200, message: "Farmer approved successfully" });
  },

  async removeSpecificFarmer(req, res) {
    const farmerId = req.params.id;

    if (!farmerId) {
      return res.status(400)
        .send({ status: 400, message: " Farmer id must be provied" });
    }

    const checkFarmerExists = await Farmer.findFarmerUsingId(farmerId);
    if (!checkFarmerExists.length) {
      return res.status(404)
        .send({ status: 404, message: "Sorry farmer with that id doesnot exist" });
    }

    await Farmer.deleteSpecificFarmer(farmerId);

    return res.status(200).send({ status: 200, message: "Farmer deleted successfully" });
  },
};

export default FarmerContrals;
