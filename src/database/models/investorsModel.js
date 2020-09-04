import db from "../connection";

const FarmerModel = {
  registerAnInvestor(rowData, logoUrl) {
    return new Promise((resolve, reject) => {
      const queryText = `INSERT INTO investors ( email,company_name,contact,password,logoUrl)
      values(
          "${rowData.email}",
          "${rowData.company_name}",
          "${rowData.contact}",
          "${rowData.password}",
          "${logoUrl}"
      );
      SELECT * FROM investors WHERE id=(SELECT LAST_INSERT_ID())`;

      db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[1][0]);
      });
    });
  },
  findSpecificInvestor(email) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM investors where email = ?";

      db.query(queryText, [email], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  findInvestorUsingId(id) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM investors where id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  updateInvestorContact(id, contact) {
    return new Promise((resolve, reject) => {
      const queryText = `UPDATE investors SET contact = "${contact}" WHERE id = ?`;

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  deleteSpecificInvestor(id) {
    return new Promise((resolve, reject) => {
      const queryText = "DELETE FROM investors WHERE id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  fetchAllInvestors() {
    return new Promise((resolve, reject) => {
      const text = "SELECT id,email, company_name AS Company, contact FROM investors;";
      db.query(text, (err, rows) => {
        if (err) { return reject(err); }
        return resolve(rows);
      });
    });
  },
};

export default FarmerModel;
