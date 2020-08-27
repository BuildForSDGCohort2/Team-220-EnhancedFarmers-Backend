import ProductModel from "../database/models/productQueries";

const ProductContraller = {
  async fetchAllProducts(req, res) {
    const getAll = await ProductModel.getAllAvailableProducts();

    if (!getAll.length) { return res.status(400).send({ message: "No product yet" }); }

    return res.status(200).send({ status: 200, data: getAll });
  },
};

export default ProductContraller;
