import db from "../connection";

const ProductModel = {
  createProductForSell: (rowData, imageUrl) =>
    new Promise(async (resolve, reject) => {
      const queryText = `INSERT INTO products 
    ( farmer_id,project_id,name,category,quantity,price,imageUrl)
      values(
          '${rowData.farmer_id}',
          '${rowData.project_id}',
          '${rowData.name}',
          '${rowData.category}',
          '${rowData.quantity}',
          '${rowData.price}',
          '${imageUrl}'
      ) RETURNING *;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    }),

  getAllAvailableProducts() {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
      id,
      farmer_id,
      project_id,
      name,
      category,
      quantity,
      price,
      imageUrl
       FROM products;`;

      await db.query(text, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  getSingleProduct(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "SELECT * FROM products where id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  removeProduct(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM products WHERE id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
  getProductsAccordingToCategory(category) {
    return new Promise(async (resolve, reject) => {
      const queryText = " SELECT * FROM products where category = $1";

      await db.query(queryText, [category], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
};

export default ProductModel;
