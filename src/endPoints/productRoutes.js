import { Router } from "express";

import Products from "../contrallers/productContrals";
import upload from "../images";

const router = Router();

router.get("/category", Products.getProductsWithSpecificCategory);

router.get("/", Products.fetchAllProducts);

router.post("/", upload.single("image"), Products.createProductReadyTosell);

router.get("/:id", Products.fetchSingleProduct);

router.delete("/:id", Products.deleteAproduct);

export default router;
