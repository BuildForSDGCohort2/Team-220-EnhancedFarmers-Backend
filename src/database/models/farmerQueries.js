import db from "../connection";

const FarmerModel = {
  registerFarmer(rowData, imageurl) {
    return new Promise(async (resolve, reject) => {
      const queryText = `INSERT INTO farmers ( email,fname,lname,contact,location,password,imageurl)
      values(
          '${rowData.email}',
          '${rowData.fname}',
          '${rowData.lname}',
          '${rowData.contact}',
          '${rowData.location}',
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
  findSpecificFarmer(email) {
    return new Promise(async (resolve, reject) => {
      const queryText = "SELECT * FROM farmers where email = $1";

      await db.query(queryText, [email], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
  findFarmerUsingId(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "SELECT * FROM farmers where id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  approveFarmerToMember(id, member) {
    return new Promise(async (resolve, reject) => {
      const queryText = `UPDATE farmers SET is_accepted = '${member}' WHERE id = $1`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },

  deleteSpecificFarmer(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM farmers WHERE id = $1";

      await db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  fetchAllFarmers() {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
      id,
      email,
      CONCAT(fname,' ',lname) AS name,
      contact,
      location,
      CASE WHEN is_accepted=true THEN 'YES'
      ELSE 'NO' 
      END AS "isAccepted" 
      FROM farmers 
      ORDER BY registered_at DESC;`;

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

export default FarmerModel;
