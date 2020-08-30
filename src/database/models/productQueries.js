import db from "../connection";

const ProductModel = {
  getAllAvailableProducts() {
    return new Promise((resolve, reject) => {
      const text = "SELECT * FROM products;";
      db.query(text, (err, rows) => {
        if (err) { return reject(err); }
        return resolve(rows);
      });
    });
  },

};

export default ProductModel;
