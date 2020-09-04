import _ from "lodash";
import bcrypt from "bcrypt";

import Investor from "../database/models/investorsModel";
import validate from "../validations/validateInvestor";
import generateHash from "../helpers/generateHash";
import generateToken from "../helpers/genrateToken";

const InvestorContrals = {
  async getAllInvestor(req, res) {
    const allInvestors = await Investor.fetchAllInvestors();
    if (!allInvestors.length) { return res.status(400).send({ status: 400, message: "No Investors yet" }); }

    return res.status(200).send({ status: 200, data: allInvestors });
  },
  async registerInvestor(req, res) {
    const investor = _.pick(req.body, [
      "email",
      "company_name",
      "contact",
      "password",
    ]);

    // capturing the image loaded by the investor
    const logo = await req.file;
    if (!logo) { return res.status(400).send({ status: 400, message: "Please select a logo" }); }
    const logoUrl = logo.path;

    const { error } = await validate.validateInvestorInput(investor);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    // checking whether the investor is already registered
    const findInvestor = await Investor.findSpecificInvestor(investor.email);
    if (findInvestor.length) {
      return res
        .status(400)
        .send({ status: 400, message: "investor already exists" });
    }

    investor.password = await generateHash(investor.password, investor.email);
    // this is where we push the data to the datebase
    const regisiterinvestor = await Investor.registerAnInvestor(investor, logoUrl);

    const { id, email, is_admin: isAdmin } = regisiterinvestor;

    const token = await generateToken(id, email, isAdmin);

    return res
      .status(201)
      .header("x-access-token", token)
      .header("access-control-expose-headers", "x-access-token")
      .send({
        status: 201,
        token,
        data: _.pick(regisiterinvestor, [
          "id",
          "email",
          "company_name",
          "contact",
          "logoUrl",
        ]),
      });
  },
  async loginInvesttor(req, res) {
    const loginInfo = _.pick(req.body, ["email", "password"]);

    const { error } = await validate.validateLogin(loginInfo);
    if (error) {
      return res.status(400).send({ status: 400, message: error.details[0].message });
    }

    const findInvestor = await Investor.findSpecificInvestor(loginInfo.email);
    if (!findInvestor.length) {
      return res.status(400).send({ status: 400, message: "wrogle email or password" });
    }

    const {
      id, email, is_admin: isAdmin, password,
    } = findInvestor[0];

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
        data: _.omit(findInvestor[0], ["password"]),
      });
  },
  async getInvestorDetails(req, res) {
    const investorId = _.pick(req.params, ["id"]);

    if (!investorId) {
      return res
        .status(400)
        .send({ status: 400, message: " investor id must be given" });
    }

    const getInvestor = await Investor.findInvestorUsingId(investorId.id);
    if (!getInvestor.length) {
      return res
        .status(404)
        .send({ status: 404, message: "investor of that id is not found" });
    }

    return res.status(200).send({
      status: 200,
      data: _.omit(getInvestor[0], ["password"]),
    });
  },

  async removeSpecificInvestor(req, res) {
    const investorId = req.params.id;

    if (!investorId) {
      return res.status(400)
        .send({ status: 400, message: " Investor id must be provied" });
    }

    const checkInvestorExists = await Investor.findInvestorUsingId(investorId);
    if (!checkInvestorExists.length) {
      return res.status(404)
        .send({ status: 404, message: "Sorry Investor with that id doesnot exist" });
    }

    await Investor.deleteSpecificInvestor(investorId);

    return res.status(200).send({ status: 200, message: "Investor deleted successfully" });
  },

  async updateInvestorContact(req, res) {
    const { contact } = req.body;
    const investorId = req.params.id;
    if (!contact) {
      return res.status(400)
        .send({ status: 400, message: "contact must give" });
    }

    if (!investorId) {
      return res.status(400)
        .send({ status: 400, message: "contact must give" });
    }

    const checkInvestor = await Investor.findInvestorUsingId(investorId);
    if (!checkInvestor) {
      return res.status(404)
        .send({ status: 404, message: "Investor your updating does not exist" });
    }

    await Investor.updateInvestorContact(investorId, contact);

    return res.status(200).send({ status: 200, message: "Contact updsted successfully" });
  },

};

export default InvestorContrals;
