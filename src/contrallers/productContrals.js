import _ from "lodash";

import ProductModel from "../database/models/productQueries";
import Project from "../database/models/projectQueries";
import Farmer from "../database/models/farmerQueries";
import validate from "../validations/validateProducts";

const ProductContraller = {
  async fetchAllProducts(req, res) {
    const getAll = await ProductModel.getAllAvailableProducts();

    if (!getAll.length) { return res.status(400).send({ message: "No product yet" }); }

    return res.status(200).send({ status: 200, data: getAll });
  },
  async createProductReadyTosell(req, res) {
    const product = _.pick(req.body,
      ["farmer_id", "project_id","name", "category", "quantity", "price"]);

    const image = req.file;
    if (!image) {
      return res.status(400).send({ status: 400, message: "Please select an image" });
    }
    const imageUrl = image.path;

    const { error } = await validate.validateProductInput(product);
    if (error) {
      return res.status(400).send({ status: 400, message: error.details[0].message });
    }

    const checkProjectExists = await Project.findProjectUsingId(product.project_id);
    if (!checkProjectExists.length) {
      return res.status(404).send({ status: 404, message: "Project does not exist" });
    }

    const checkFarmerExists = await Farmer.findFarmerUsingId(product.farmer_id);
    if (!checkFarmerExists.length) {
      return res.status(404).send({ status: 404, message: "Farmer does not exist" });
    }

    const createProduct = await ProductModel.createProductForSell(product, imageUrl);

    return res.status(201).send({ status: 201, data: createProduct });
  },
  fetchSingleProduct: async (req, res) => {
    const ProductId = req.params.id;

    if (!ProductId) {
      return res.status(400).status({ status: 400, message: "Id must be provided" });
    }

    const getProduct = await ProductModel.getSingleProduct(ProductId);
    if (!getProduct.length) {
      return res.status(404).send({ status: 404, message: "Product not found" });
    }

    return res.status(200).send({ status: 200, data: getProduct[0] });
  },
  async deleteAproduct(req, res) {
    const ProductId = req.params.id;

    if (!ProductId) {
      return res.status(400).status({ status: 400, message: "Id must be provided" });
    }

    const getProduct = await ProductModel.getSingleProduct(ProductId);
    if (!getProduct.length) {
      return res.status(404).send({ status: 404, message: "Product not found" });
    }

    await ProductModel.removeProduct(ProductId);

    return res.status(200).send({ status: 200, message: "Product deleted succesffully" });
  },

  async getProductsWithSpecificCategory(req, res) {
    const productCategory = req.query.category;

    if (!productCategory) {
      return res.status(400).send({ status: 400, message: "Category is needed" });
    }

    const getThem = await ProductModel.getProductsAccordingToCategory(productCategory);

    return res.status(200).send({ status: 200, data: getThem });
  },
};

export default ProductContraller;
