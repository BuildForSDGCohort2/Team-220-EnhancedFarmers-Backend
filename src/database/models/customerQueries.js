import db from "../connection";

const CustomerModel = {
  registerCustomers(rowData, imageUrl) {
    return new Promise(async (resolve, reject) => {
      const queryText = `INSERT INTO customers ( email ,username,contact,password,imageUrl)
      values(
          '${rowData.email}',
          '${rowData.username}',
          '${rowData.contact}',
          '${rowData.password}',
          '${imageUrl}'
      ) RETURNING *;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },
  findSpecificCustomer(email) {
    return new Promise(async (resolve, reject) => {
      const queryText = " SELECT * FROM customers where email = $1";

      await db.query(queryText, [email], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  updatePassword(id, password) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE customers SET password = '${password}' WHERE id =$1`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  updateImageUrl(id, imageurl) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE customers SET imageurl = '${imageurl}' WHERE id =$1`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  findCustomersUsingId(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = `SELECT 
      id,
      email,
      username,
      contact,
      imageUrl
       FROM customers where id = $1`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  deleteSpecificCustomer(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM customers WHERE id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  fetchAllCustomers() {
    return new Promise(async (resolve, reject) => {
      const queryText = `SELECT 
      id,
      username,
      email,
      contact,
      imageUrl
       FROM customers;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
};

export default CustomerModel;
