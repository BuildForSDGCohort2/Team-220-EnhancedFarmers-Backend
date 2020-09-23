import db from "../connection";

const ProductModel = {
  createProductForSell: (rowData, imageUrl) =>
    new Promise((resolve, reject) => {
      const queryText = `INSERT INTO products 
    ( farmer_id,project_id,name,category,quantity,price,imageUrl)
      values(
          "${rowData.farmer_id}",
          "${rowData.project_id}",
          "${rowData.name}",
          "${rowData.category}",
          "${rowData.quantity}",
          "${rowData.price}",
          "${imageUrl}"
      );
      SELECT * FROM products WHERE id=(SELECT LAST_INSERT_ID())`;

      db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[1][0]);
      });
    }),

  getAllAvailableProducts() {
    return new Promise((resolve, reject) => {
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
      db.query(text, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  getSingleProduct(id) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM products where id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  removeProduct(id) {
    return new Promise((resolve, reject) => {
      const queryText = "DELETE FROM products WHERE id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  getProductsAccordingToCategory(category) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM products where category = ?";

      db.query(queryText, [category], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
};

export default ProductModel;
