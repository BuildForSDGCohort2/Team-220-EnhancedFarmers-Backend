import db from "../connection";

const FarmerModel = {
  registerFarmer(rowData, imageUrl) {
    return new Promise((resolve, reject) => {
      const queryText = `INSERT INTO farmers ( email,fname,lname,contact,location,password,imageUrl)
      values(
          "${rowData.email}",
          "${rowData.fname}",
          "${rowData.lname}",
          "${rowData.contact}",
          "${rowData.location}",
          "${rowData.password}",
          "${imageUrl}"
      );
      SELECT * FROM farmers WHERE id=(SELECT LAST_INSERT_ID())`;

      db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[1][0]);
      });
    });
  },
  findSpecificFarmer(email) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM farmers where email = ?";

      db.query(queryText, [email], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  findFarmerUsingId(id) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM farmers where id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  approveFarmerToMember(id, member) {
    return new Promise((resolve, reject) => {
      const queryText = `UPDATE farmers SET is_accepted = "${member}" WHERE id = ?`;

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  deleteSpecificFarmer(id) {
    return new Promise((resolve, reject) => {
      const queryText = "DELETE FROM farmers WHERE id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  fetchAllFarmers() {
    return new Promise((resolve, reject) => {
      const text = "SELECT id,email,CONCAT(fname,' ',lname) AS name,location,is_accepted FROM farmers ORDER BY registered_at DESC;";
      db.query(text, (err, rows) => {
        if (err) { return reject(err); }
        return resolve(rows);
      });
    });
  },
};

export default FarmerModel;
