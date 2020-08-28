import db from "../connection";

const ProfessionalModel = {
  registerProfessional(rowData) {
    return new Promise((resolve, reject) => {
      const queryText = `INSERT INTO professionals ( email,fname,lname,contact,residence,profession,password)
      values(
          "${rowData.email}",
          "${rowData.fname}",
          "${rowData.lname}",
          "${rowData.contact}",
          "${rowData.residence}",
          "${rowData.profession}",
          "${rowData.password}"
      );
      SELECT * FROM professionals WHERE id=(SELECT LAST_INSERT_ID())`;

      db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[1][0]);
      });
    });
  },
  findSpecificProfession(email) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM professionals where email = ?";

      db.query(queryText, [email], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  findProUsingId(id) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM professionals where id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  removeAProfessionalFromDb(id) {
    return new Promise((resolve, reject) => {
      const queryText = "DELETE FROM professionals WHERE id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
};

export default ProfessionalModel;
