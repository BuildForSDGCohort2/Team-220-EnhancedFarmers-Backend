import _ from "lodash";
import bcrypt from "bcrypt";

import validate from "../validations/customerValidation";
import Customers from "../database/models/customerQueries";
import generateHash from "../helpers/generateHash";
import generateToken from "../helpers/generateTokenCustomers";

const CustomerContrals = {
  async registerNewCustomer(req, res) {
    const customer = _.pick(req.body, ["email", "username", "password"]);

    // capturing the image loaded by the farmer
    const image = await req.file;
    let imageUrl;
    if (image) {
      imageUrl = image.path;
    } else {
      imageUrl = "";
    }

    const { error } = await validate.validateInput(customer);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    // checking whether the farmer is already registered
    const findCustomer = await Customers.findSpecificCustomer(customer.email);
    if (findCustomer.length) {
      return res.status(400).send({
        status: 400,
        message: "Customer already has an Account try login",
      });
    }

    customer.password = await generateHash(customer.password, customer.email);
    // this is where we push the data to the datebase
    const createCustomer = await Customers.registerCustomers(
      customer,
      imageUrl
    );

    const { id, email, username } = createCustomer;

    const token = await generateToken(id, email, username);

    return res
      .status(201)
      .header("x-access-token", token)
      .header("access-control-expose-headers", "x-access-token")
      .send({
        status: 201,
        token,
        data: _.pick(createCustomer, ["id", "email", "username", "imageUrl"]),
      });
  },
  async loginCustomer(req, res) {
    const loginInfo = _.pick(req.body, ["email", "password"]);

    const { error } = await validate.validateLogin(loginInfo);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const findCustomer = await Customers.findSpecificCustomer(loginInfo.email);
    if (!findCustomer.length) {
      return res
        .status(400)
        .send({ status: 400, message: "wrogle email or password" });
    }

    const { id, email, username, password } = findCustomer[0];

    const isValid = await bcrypt.compare(loginInfo.password, password);
    if (!isValid) {
      return res
        .status(400)
        .send({ status: 400, message: "wrogle email or password" });
    }

    const token = await generateToken(id, email, username);

    return res
      .status(200)
      .header("x-access-token", token)
      .header("access-control-expose-headers", "x-access-token")
      .send({
        status: 200,
        token,
        data: _.omit(findCustomer[0], ["password"]),
      });
  },

  async changePassword(req, res) {
    const info = _.pick(req.body, ["email", "password", "confirmPassword"]);

    const { error } = await validate.validateChangePassword(info);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    if (info.password !== info.confirmPassword) {
      return res.status(400).send({
        status: 400,
        message: "password and confirm password mist be the same",
      });
    }

    const findCustomer = await Customers.findSpecificCustomer(info.email);
    if (!findCustomer.length) {
      return res
        .status(400)
        .send({ status: 400, message: "Invalid Email Please check it" });
    }
    const { id } = findCustomer[0];
    console.log(req.user);

    const { id: userId } = req.user;

    if (id !== userId) {
      return res.status(400).send({
        status: 400,
        message:
          "Sorry you can not update a password for an accound that is not users",
      });
    }

    const password = await generateHash(info.password, info.email);

    await Customers.updatePassword(userId, password);

    return res
      .status(200)
      .send({ status: 200, message: "Password update Successfully" });
  },
};

export default CustomerContrals;
