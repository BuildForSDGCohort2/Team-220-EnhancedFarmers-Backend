import _ from "lodash";

import OrderModel from "../database/models/ordersQueries";
import Customers from "../database/models/customerQueries";
import Products from "../database/models/productQueries";
import validate from "../validations/validateOrder";

const OrderContrals = {
  async getAllOrders(req, res) {
    const getAll = await OrderModel.fetchAllOders();

    if (!getAll.length) {
      return res.status(400).send({ status: 400, message: "No orders yet" });
    }

    return res.status(200).send({ status: 200, data: getAll });
  },

  async getAllPendingOrders(req, res) {
    const getThem = await OrderModel.fetchAllPedingOrders();

    if (!getThem.length) {
      return res.status(400).send({ status: 400, message: "No orders yet" });
    }

    return res.status(200).send({ status: 200, data: getThem });
  },

  async getOrdersByCustomer(req, res) {
    const customerId = req.params.id;

    const getThem = await OrderModel.fetchAllOrdersByCustomer(customerId);

    if (!getThem.length) {
      return res.status(400).send({ status: 400, message: "No orders yet" });
    }

    return res.status(200).send({ status: 200, data: getThem });
  },

  async createAnOrder(req, res) {
    const order = _.pick(req.body, ["product_id", "offerd_price"]);

    const { error } = await validate.validateOrder(order);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const { id, email } = req.user;

    const checkCustomer = await Customers.findSpecificCustomer(email);

    if (!checkCustomer.length) {
      return res.status(400).send({
        status: 400,
        message:
          "Please login as a customer or create an account as a customer",
      });
    }

    const checkAprocuct = await Products.getSingleProduct(order.product_id);

    if (!checkAprocuct.length) {
      return res
        .status(404)
        .send({ status: 404, message: "Product no longer available" });
    }
    // get price from the returned product
    const { price } = checkAprocuct[0];
    // setting the price to be apart of the request body object
    order.price = price;

    const createOrder = await OrderModel.makeAnOrder(order, id);

    return res.status(201).send({ status: 201, data: createOrder });
  },

  async getSpecificOrder(req, res) {
    const orderId = req.params.id;

    const getOrder = await OrderModel.findOrderUsingId(orderId);

    if (!getOrder.length) {
      return res.status(404).send({ status: 404, message: "Order not found" });
    }

    return res.status(200).send({ status: 200, data: getOrder[0] });
  },
  async deleteAnOrder(req, res) {
    const orderId = req.params.id;

    const getOrder = await OrderModel.findOrderUsingId(orderId);

    if (!getOrder.length) {
      return res.status(404).send({ status: 404, message: "Order not found" });
    }

    await OrderModel.deleteSpecificOrder(orderId);

    return res
      .status(200)
      .send({ status: 200, message: "Order deleted successfully" });
  },

  async updateOrderPrice(req, res) {
    const price = _.pick(req.body, ["price"]);
    const orderId = req.params.id;

    if (!price.price) {
      return res
        .status(400)
        .send({ status: 400, message: "Price must be provided" });
    }

    const getOrder = await OrderModel.getOrder(orderId);

    if (!getOrder.length) {
      return res.status(404).send({ status: 404, message: "Order not found" });
    }

    const { user } = req;

    if (getOrder[0].status === "approved") {
      return res.status(400).send({
        status: 400,
        message: "You can not change the price of an approved order",
      });
    }

    if (user.id === getOrder[0].customer_id || user.isAdmin) {
      await OrderModel.ChangePrice(orderId, price.price);

      return res
        .status(200)
        .send({ status: 200, message: "Price updated successfully" });
    }

    return res.status(400).send({
      status: 400,
      message: "Your not allowed to update the order you did not make",
    });
  },

  async changeOrderStatus(req, res) {
    const status = _.pick(req.body, ["status"]);
    const orderId = req.params.id;

    const { error } = await validate.validateStatus(status);
    if (error) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }

    const getOrder = await OrderModel.getOrder(orderId);

    if (!getOrder.length) {
      return res.status(404).send({ status: 404, message: "Order not found" });
    }

    await OrderModel.ChangeStatus(orderId, status.status);

    return res
      .status(200)
      .send({ status: 200, message: "Status updated successfully" });
  },
};

export default OrderContrals;
