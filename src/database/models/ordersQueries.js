import db from "../connection";

const OrdersModel = {
  makeAnOrder(rowData, id) {
    return new Promise(async (resolve, reject) => {
      const queryText = `INSERT INTO farmers (product_id,customer_id,price,offered_price)
      values(
          "${rowData.product_id}",
          "${id}",
          "${rowData.price}",
          "${rowData.offered_price}"
      );
      SELECT * FROM farmers WHERE id=(SELECT LAST_INSERT_ID())`;

      await db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[1][0]);
      });
    });
  },

  findOrderUsingId(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = `SELECT 
      o.id AS id,
      c.username AS name,
      c.email AS email,
      c.conatct AS contact,
      p.name AS product,
      p.price AS price,
      o.offered_price AS offered_price
      FROM orders o
        INNER JOIN customers c
          ON c.id = o.customer_id
        INNER JOIN products p
          ON O.product_id = p.id
      WHERE o.id = ?
      ORDER BY o.created_on DESC;`;

      await db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  ChangeStatus(id, status) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE farmers SET is_accepted = "${status}" WHERE id = ?`;

      await db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  ChangePrice(id, price) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE farmers SET offered_price = "${price}" WHERE id = ?`;

      await db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  getOrder(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DSELECT * orders WHERE id = ?";

      await db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  deleteSpecificOrder(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM orders WHERE id = ?";

      await db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  fetchAllOders() {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
      o.id AS id,
      c.username AS name,
      c.email AS email,
      c.conatct AS contact,
      p.name AS product,
      p.price AS price,
      o.offered_price AS offered_price
      FROM orders o
        INNER JOIN customers c
          ON c.id = o.customer_id
        INNER JOIN products p
          ON O.product_id = p.id
      ORDER BY o.created_on DESC;`;

      await db.query(text, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  fetchAllPedingOrders() {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
      o.id AS id,
      c.username AS name,
      c.email AS email,
      c.conatct AS contact,
      p.name AS product,
      p.price AS price,
      o.offered_price AS offered_price
      FROM orders o
        INNER JOIN customers c
          ON c.id = o.customer_id
        INNER JOIN products p
          ON O.product_id = p.id
      WHERE o.status='pending'
      ORDER BY o.created_on DESC;`;
      await db.query(text, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  fetchAllOrdersByCustomer(id) {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
      o.id AS id,
      c.username AS name,
      c.email AS email,
      c.conatct AS contact,
      p.name AS product,
      p.price AS price,
      o.offered_price AS offered_price
      FROM orders o
        INNER JOIN customers c
          ON c.id = o.customer_id
        INNER JOIN products p
          ON O.product_id = p.id
      WHERE o.customer_id=?
      ORDER BY o.created_on DESC;`;

      await db.query(text, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
};

export default OrdersModel;
