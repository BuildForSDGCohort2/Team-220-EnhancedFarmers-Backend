import db from "../connection";

const InvestorModel = {
  registerAnInvestor(rowData, logoUrl) {
    return new Promise(async (resolve, reject) => {
      const queryText = `INSERT INTO investors ( email,company_name,contact,password,logoUrl)
      values(
          '${rowData.email}',
          '${rowData.company_name}',
          '${rowData.contact}',
          '${rowData.password}',
          '${logoUrl}'
      )
      RETURNING *;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },

  findSpecificInvestor(email) {
    return new Promise(async (resolve, reject) => {
      const queryText = " SELECT * FROM investors where email = $1";

      await db.query(queryText, [email], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
  findInvestorUsingId(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = " SELECT * FROM investors where id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  updateInvestorContact(id, contact) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE investors SET contact = "${contact}" WHERE id = $1`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },

  deleteSpecificInvestor(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM investors WHERE id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },

  fetchAllInvestors() {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
        id,
        email, company_name AS name, contact FROM investors;`;

      await db.query(text, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
};

export default InvestorModel;
