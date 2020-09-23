import { Router } from "express";

import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import Orders from "../contrallers/ordersContrals";

const router = Router();

router.get("/", [auth, admin], Orders.getAllOrders);

router.get("/pending", [auth, admin], Orders.getAllPendingOrders);

router.get("/:id", auth, Orders.getSpecificOrder);

router.get("/:id/customer", auth, Orders.getOrdersByCustomer);

router.delete("/:id", [auth, admin], Orders.deleteAnOrder);

router.post("/create", auth, Orders.createAnOrder);

router.patch("/:id/price", auth, Orders.updateOrderPrice);

router.patch("/:id/status", [auth, admin], Orders.changeOrderStatus);

export default router;
