import db from "../connection";

const ProjectModel = {
  registerAproject(rowData) {
    return new Promise(async (resolve, reject) => {
      const queryText = `INSERT INTO projects (farmer_id,profesional_id,
        investor_id,name,product_category,amount,max_amount,end_time,description)
      values(
          '${rowData.farmer_id}',
          '${rowData.profesional_id}',
          '${rowData.investor_id}',
          '${rowData.name}',
          '${rowData.product_category}',
          '${rowData.amount}',
          '${rowData.max_amount}',
          '${rowData.end_time}',
          '${rowData.description}'
      )RETURNING *;`;

      await db.query(queryText, (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows[0]);
        }
        return reject(err);
      });
    });
  },

  findProjectUsingId(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "SELECT * FROM projects where id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  getProjectById(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = `SELECT 
      p.id,
      p.name AS name,
      CONCAT(f.fname, ' ', f.lname) AS Farmer,
      CONCAT(pro.fname, ' ', pro.lname) AS Professional,
      i.company_name AS Investor,
      p.product_category AS category,
      p.amount AS InvestedAmount,
      p.max_amount AS MaxAmountToInvest,
      IF(p.amount < p.max_amount, 'Yes', 'No') AS funding,
      p.end_time AS harvestPeriod,
      p.description AS Description
        FROM projects p
        INNER JOIN farmers f
      ON p.farmer_id = f.id
        INNER JOIN investors i
      ON p.investor_id = i.id
        INNER JOIN professionals pro
      ON p.profesional_id = pro.id
        WHERE  p.id = $1;`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  getProjectBySameProffesional(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = `SELECT 
      p.id,
      p.name AS name,
      CONCAT(f.fname, ' ', f.lname) AS "Farmer",
      CONCAT(pro.fname, ' ', pro.lname) AS "Professional",
      i.company_name AS "Investor",
      p.product_category AS category,
      p.amount AS "InvestedAmount",
      p.max_amount AS "MaxAmountToInvest",
      CASE WHEN p.amount < p.max_amount THEN 'Yes'
      ELSE 'No'
      END AS "funding",
      TO_CHAR(p.end_time,'Mon-dd-YYYY') AS "harvestPeriod",
      p.description AS "Description"
        FROM projects p
        INNER JOIN farmers f
      ON p.farmer_id = f.id
        INNER JOIN investors i
      ON p.investor_id = i.id
        INNER JOIN professionals pro
      ON p.profesional_id = pro.id
        WHERE  p.profesional_id = $1;`;

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },

  deleteSpecificProject(id) {
    return new Promise(async (resolve, reject) => {
      const queryText = "DELETE FROM projects WHERE id = $1";

      await db.query(queryText, [id], (err, res) => {
        if (res) {
          const { rows } = res;
          return resolve(rows);
        }
        return reject(err);
      });
    });
  },
  fetchAllProjects() {
    return new Promise(async (resolve, reject) => {
      const text = `SELECT 
      p.id,
      p.name AS name,
      CONCAT(f.fname, ' ', f.lname) AS farmer,
      CONCAT(pro.fname, ' ', pro.lname) AS professional,
      i.company_name AS investor,
      p.product_category AS category,
      p.amount AS "investedAmount",
      p.max_amount AS "maxAmountToInvest",
      CASE WHEN p.amount < p.max_amount THEN 'Yes'
      ELSE 'No'
      END AS funding,
      TO_CHAR(p.end_time,'Mon-dd-YYYY') AS "harvestPeriod",
      p.description AS description
        FROM projects p
        INNER JOIN farmers f
      ON p.farmer_id = f.id
        INNER JOIN investors i
      ON p.investor_id = i.id
        INNER JOIN professionals pro
      ON p.profesional_id = pro.id
       ORDER BY created_on DESC;`;

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

export default ProjectModel;
