import db from "../connection";

const CustomerModel = {
  registerCustomers(rowData, imageUrl) {
    return new Promise((resolve, reject) => {
      const queryText = `INSERT INTO customers ( email ,username,password,imageUrl)
      values(
          "${rowData.email}",
          "${rowData.username}",
          "${rowData.password}",
          "${imageUrl}"
      );
      SELECT * FROM customers WHERE id=(SELECT LAST_INSERT_ID())`;

      db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[1][0]);
      });
    });
  },
  findSpecificCustomer(email) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM customers where email = ?";

      db.query(queryText, [email], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  updatePassword(id, password) {
    return new Promise((resolve, reject) => {
      const queryText = `UPDATE customers SET password = "${password}" WHERE id =?`;

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  updateImageUrl(id, imageUrl) {
    return new Promise((resolve, reject) => {
      const queryText = `UPDATE customers SET password = "${imageUrl}" WHERE id =?`;

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  findCustomersUsingId(id) {
    return new Promise((resolve, reject) => {
      const queryText = `SELECT 
      id,
      email,
      username,
      imageUrl
       FROM customers where id = ?`;

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  deleteSpecificCustomer(id) {
    return new Promise((resolve, reject) => {
      const queryText = "DELETE FROM customers WHERE id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  fetchAllCustomers() {
    return new Promise((resolve, reject) => {
      const queryText = `SELECT 
      id,
      username,
      email,
      imageUrl
       FROM customers;`;

      db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
};

export default CustomerModel;
