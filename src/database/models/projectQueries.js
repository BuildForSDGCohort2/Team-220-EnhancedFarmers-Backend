import db from "../connection";

const ProjectModel = {
  registerAproject(rowData) {
    return new Promise((resolve, reject) => {
      const queryText = `INSERT INTO projects (farmer_id,profesional_id,
        investor_id,name,product_category,amount,max_amount,end_time,description)
      values(
          "${rowData.farmer_id}",
          "${rowData.profesional_id}",
          "${rowData.investor_id}",
          "${rowData.name}",
          "${rowData.product_category}",
          "${rowData.amount}",
          "${rowData.max_amount}",
          "${rowData.end_time}",
          "${rowData.description}"
      );
      SELECT * FROM projects WHERE id=(SELECT LAST_INSERT_ID())`;

      db.query(queryText, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[1][0]);
      });
    });
  },

  findProjectUsingId(id) {
    return new Promise((resolve, reject) => {
      const queryText = " SELECT * FROM projects where id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  getProjectById(id) {
    return new Promise((resolve, reject) => {
      const queryText = `SELECT 
      p.id,
      p.name AS name,
      CONCAT(f.fname, ' ', f.lname) AS Farmer,
      CONCAT(pro.fname, ' ', pro.lname) AS Professional,
      i.company_name AS Investor,
      p.product_category AS category,
      p.amount AS InvestedAmount,
      p.max_amount AS MaxAmountToInvest,
      p.end_time AS harvestPeriod,
      p.description AS Description
        FROM projects p
        INNER JOIN farmers f
      ON p.farmer_id = f.id
        INNER JOIN investors i
      ON p.investor_id = i.id
        INNER JOIN professionals pro
      ON p.profesional_id = pro.id
        WHERE  p.id = ?;`;
      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  getProjectBySameProffesional(id) {
    return new Promise((resolve, reject) => {
      const queryText = `SELECT 
      p.id,
      p.name AS name,
      CONCAT(f.fname, ' ', f.lname) AS Farmer,
      CONCAT(pro.fname, ' ', pro.lname) AS Professional,
      i.company_name AS Investor,
      p.product_category AS category,
      p.amount AS InvestedAmount,
      p.max_amount AS MaxAmountToInvest,
      p.end_time AS harvestPeriod,
      p.description AS Description
        FROM projects p
        INNER JOIN farmers f
      ON p.farmer_id = f.id
        INNER JOIN investors i
      ON p.investor_id = i.id
        INNER JOIN professionals pro
      ON p.profesional_id = pro.id
        WHERE  p.profesional_id = ?;`;
      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },

  deleteSpecificProject(id) {
    return new Promise((resolve, reject) => {
      const queryText = "DELETE FROM projects WHERE id = ?";

      db.query(queryText, [id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows);
      });
    });
  },
  fetchAllProjects() {
    return new Promise((resolve, reject) => {
      const text = `SELECT 
      p.id,
      p.name AS name,
      CONCAT(f.fname, ' ', f.lname) AS farmer,
      CONCAT(pro.fname, ' ', pro.lname) AS professional,
      i.company_name AS investor,
      p.product_category AS category,
      p.amount AS investedAmount,
      p.max_amount AS maxAmountToInvest,
      p.end_time AS harvestPeriod,
      p.description AS description
        FROM projects p
        INNER JOIN farmers f
      ON p.farmer_id = f.id
        INNER JOIN investors i
      ON p.investor_id = i.id
        INNER JOIN professionals pro
      ON p.profesional_id = pro.id
       ORDER BY created_on DESC;`;
      db.query(text, (err, rows) => {
        if (err) { return reject(err); }
        return resolve(rows);
      });
    });
  },
};

export default ProjectModel;
