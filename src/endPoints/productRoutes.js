import { Router } from "express";

import Products from "../contrallers/productContrals";

const router = Router();

router.get("/", Products.fetchAllProducts);

export default router;
