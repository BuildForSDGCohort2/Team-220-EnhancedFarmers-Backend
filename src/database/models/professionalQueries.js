import db from "../connection";

const ProfessionalModel = {
  registerProfessional(rowData, imageUrl) {
    return new Promise((resolve, reject) => {
      const queryText = `INSERT INTO professionals ( email,fname,lname,contact,residence,profession,password,imageUrl)
      values(
          "${rowData.email}",
          "${rowData.fname}",
          "${rowData.lname}",
          "${rowData.contact}",
          "${rowData.residence}",
          "${rowData.profession}",
          "${rowData.password}",
          "${imageUrl}"
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
  fetchAllProfessionals() {
    return new Promise((resolve, reject) => {
      const text = `SELECT 
      id,
      email, 
      CONCAT(fname, ' ', lname) as name,
      contact AS Contact,
      residence AS Residence,
      profession AS Profession,
      imageUrl,
      IF(is_admin = 1, 'true', 'false') AS isAdmin 
      FROM professionals;`;
      db.query(text, (err, rows) => {
        if (err) { return reject(err); }
        return resolve(rows);
      });
    });
  },
};

export default ProfessionalModel;
