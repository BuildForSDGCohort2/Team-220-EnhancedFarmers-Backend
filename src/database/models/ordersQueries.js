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
      ) RETURNING *`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
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
      WHERE o.id = $1
      ORDER BY o.created_on DESC;`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  ChangeStatus(id, status) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE farmers SET is_accepted = '${status}' WHERE id = $1`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  ChangePrice(id, price) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE farmers SET offered_price = '${price}' WHERE id = $1`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  getOrder(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "SELECT * orders WHERE id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
  deleteSpecificOrder(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM orders WHERE id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
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

      await db.query(text, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
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

      await db.query(text, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
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
      WHERE o.customer_id=$1
      ORDER BY o.created_on DESC;`;

      await db.query(text, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
};

export default OrdersModel;
