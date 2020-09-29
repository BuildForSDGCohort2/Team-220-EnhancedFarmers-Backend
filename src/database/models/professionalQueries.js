import db from "../connection";

const ProfessionalModel = {
  registerProfessional(rowData, imageurl) {
    return new Promise(async (resolve, reject) => {
      const queryText = `INSERT INTO professionals ( email,fname,lname,contact,residence,profession,password,imageurl)
      values(
          '${rowData.email}',
          '${rowData.fname}',
          '${rowData.lname}',
          '${rowData.contact}',
          '${rowData.residence}',
          '${rowData.profession}',
          '${rowData.password}',
          '${imageurl}'
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
  findSpecificProfession(email) {
    return new Promise(async (resolve, reject) => {
      const queryText = "SELECT * FROM professionals where email = $1";

      await db.query(queryText, [email], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },
  findProUsingId(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = " SELECT * FROM professionals where id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  removeAProfessionalFromDb(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM professionals WHERE id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
  fetchAllProfessionals() {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
      id,
      email, 
      CONCAT(fname, ' ', lname) as name,
      contact AS "Contact",
      residence AS "Residence",
      profession AS "Profession",
      imageUrl,
      CASE WHEN is_admin = true THEN 'YES'
      else 'NO'
      END AS "isAdmin" 
      FROM professionals;`;

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

export default ProfessionalModel;
