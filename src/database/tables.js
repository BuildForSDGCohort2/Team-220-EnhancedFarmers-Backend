import db from "./connection";

const farmers = {
  create: `CREATE TABLE IF NOT EXISTS farmers (
          id int primary key auto_increment,
          email VARCHAR(30) NOT NULL,
          fname VARCHAR(255) NOT NULL,
          lname VARCHAR(255) NOT NULL,
          registered_at TIMESTAMP DEFAULT NOW(),
          is_accepted BOOLEAN DEFAULT false,
          contact VARCHAR(20) NOT NULL,
          location VARCHAR(255) NOT NULL,
          password TEXT NOT NULL,
          imageUrl VARCHAR(255) NOT NULL
      );`,
  drop: "DROP TABLE IF EXISTS farmers  CASCADE;",
};

const products = {
  create: `CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        farmer_id int REFERENCES farmers(id) ON DELETE CASCADE,
        product_category VARCHAR(30) NOT NULL,
        quantity int NOT NULL,
        price float NOT NULL,
        location VARCHAR(255) NOT NULL
    );`,
  drop: "DROT TABLE IF EXISTS products CASCADE;",
};

const professionsals = {
  create: `CREATE TABLE IF NOT EXISTS professionals (
          id int primary key auto_increment,
          email VARCHAR(30) NOT NULL,
          fname VARCHAR(255) NOT NULL,
          lname VARCHAR(255) NOT NULL,
          registered_at TIMESTAMP DEFAULT NOW(),
          contact VARCHAR(20) NOT NULL,
          residence VARCHAR(255) NOT NULL,
          profession VARCHAR(255) NOT NULL,
          password TEXT NOT NULL,
          is_admin BOOLEAN DEFAULT false
      );`,
  drop: "DROP TABLE IF EXISTS professionals CASCADE;",
};
const investor = {
  create: `CREATE TABLE IF NOT EXISTS investors (
          id int primary key auto_increment,
          email VARCHAR(30) NOT NULL,
          company_name VARCHAR(255) NOT NULL,
          contact VARCHAR(30) NOT NULL,
          password TEXT NOT NULL,
          logoUrl VARCHAR(255) NOT NULL
      );`,
  drop: "DROP TABLE IF EXISTS investors CASCADE;",
};

function createTableFarmers() {
  return new Promise((resolve, reject) => {
    db.query(farmers.create, (err) => {
      if (!err) return resolve({ message: "farmers table created" });
      return reject(err);
    });
  });
}

function deleteTableFarmers() {
  return new Promise((resolve, reject) => {
    db.query(farmers.drop, (err) => {
      if (!err) return resolve({ message: "farmers table deleted" });
      return reject(err);
    });
  });
}

function createTableProducts() {
  return new Promise((resolve, reject) => {
    db.query(products.create, (err) => {
      if (!err) return resolve({ message: "farmers table created" });
      return reject(err);
    });
  });
}

function deleteTableProducts() {
  return new Promise((resolve, reject) => {
    db.query(products.drop, (err) => {
      if (!err) return resolve({ message: "farmers table deleted" });
      return reject(err);
    });
  });
}

function createTableProfessional() {
  return new Promise((resolve, reject) => {
    db.query(professionsals.create, (err) => {
      if (!err) return resolve({ message: "professionals table created" });
      return reject(err);
    });
  });
}

function deleteTableProfessional() {
  return new Promise((resolve, reject) => {
    db.query(professionsals.drop, (err) => {
      if (!err) return resolve({ message: "professionals table deleted" });
      return reject(err);
    });
  });
}

function createTableInvestors() {
  return new Promise((resolve, reject) => {
    db.query(investor.create, (err) => {
      if (!err) return resolve({ message: "investors table created" });
      return reject(err);
    });
  });
}

function deleteTableInvestors() {
  return new Promise((resolve, reject) => {
    db.query(investor.drop, (err) => {
      if (!err) return resolve({ message: "investors table deleted" });
      return reject(err);
    });
  });
}

export default {
  createTableFarmers,
  deleteTableFarmers,
  createTableProducts,
  deleteTableProducts,
  createTableProfessional,
  deleteTableProfessional,
  createTableInvestors,
  deleteTableInvestors,
};
