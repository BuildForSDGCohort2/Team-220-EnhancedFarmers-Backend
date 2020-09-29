import db from "./connection";

const farmers = {
  create: `CREATE TABLE IF NOT EXISTS farmers (
          id SERIAL primary key,
          email VARCHAR(30) NOT NULL,
          fname VARCHAR(255) NOT NULL,
          lname VARCHAR(255) NOT NULL,
          registered_at TIMESTAMP DEFAULT NOW(),
          is_accepted BOOLEAN DEFAULT false,
          contact VARCHAR(20) NOT NULL,
          location VARCHAR(255) NOT NULL,
          password TEXT NOT NULL,
          imageUrl VARCHAR(255) NOT NULL
      ) ;`,
  drop: "DROP TABLE IF EXISTS farmers  CASCADE;",
};

const products = {
  create: `CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        farmer_id int REFERENCES farmers(id) ON DELETE CASCADE,
        project_id INT REFERENCES projects (id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(150) NOT NULL,
        quantity int NOT NULL,
        price FLOAT NOT NULL,
        imageUrl VARCHAR(255) NOT NULL
    );`,
  drop: "DROP TABLE IF EXISTS products CASCADE;",
};

const professionsals = {
  create: `CREATE TABLE IF NOT EXISTS professionals (
          id SERIAL primary key,
          email VARCHAR(30)  UNIQUE NOT NULL,
          fname VARCHAR(255) NOT NULL,
          lname VARCHAR(255) NOT NULL,
          registered_at TIMESTAMP DEFAULT NOW(),
          contact VARCHAR(20) NOT NULL,
          residence VARCHAR(255) NOT NULL,
          profession VARCHAR(255) NOT NULL,
          password TEXT NOT NULL,
          is_admin BOOLEAN DEFAULT false,
          imageUrl VARCHAR(255) NOT NULL
      );`,
  insert: `
      INSERT INTO professionals (email,fname,lname,contact,residence,
      profession,password,is_admin,imageUrl)
      VALUES(
        'mugabamuha@gmail.com',
        'Rashid',
        'Mugaba',
        '057688967',
        'Kampala',
        'admin',
       '$2b$10$IGqTY7vNcOe5/Ky3rQ/V2Oje0Uc9iFm8ttlgodyW2KLC4PEXRhma6',
        true,
        '/uploads/image'
      );`,
  drop: "DROP TABLE IF EXISTS professionals CASCADE;",
};

const investor = {
  create: `CREATE TABLE IF NOT EXISTS investors (
          id SERIAL primary key,
          email VARCHAR(30) NOT NULL,
          company_name VARCHAR(255) NOT NULL,
          contact VARCHAR(30) NOT NULL,
          password TEXT NOT NULL,
          logoUrl VARCHAR(255) NOT NULL
      );`,
  drop: "DROP TABLE IF EXISTS investors CASCADE;",
};

const projects = {
  create: `CREATE TABLE IF NOT EXISTS projects (
    id SERIAL primary key,
    farmer_id INT REFERENCES farmers (id) ON DELETE CASCADE,
    profesional_id INT REFERENCES professionals (id) ON DELETE CASCADE,
    investor_id INT REFERENCES investors (id) ON DELETE CASCADE,
    product_category VARCHAR(100) NOT NULL,
    name VARCHAR(250) NOT NULL,
    amount FLOAT NOT NULL,
    max_amount FLOAT NOT NULL,
    created_on TIMESTAMP DEFAULT NOW(),
    end_time DATE,
    description TEXT,
    is_progress BOOLEAN DEFAULT TRUE
    );`,
  delete: "DROP TABLE IF EXISTS projects CASCADE",
};

const customers = {
  create: `CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    registered_on TIMESTAMP NOT NULL DEFAULT NOW(),
    imageUrl VARCHAR(255)
  );`,
  delete: "DROP TABLE IF EXISTS customers CASCADE",
};

const orders = {
  create: `CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products (id) ON DELETE CASCADE,
    customer_id INT REFERENCES customers (id) ON DELETE CASCADE,
    price FLOAT NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
    offered_price FLOAT NOT NULL,
    status ENUM('pending','rejected','approved') NOT NULL DEFAULT 'pending'
  )`,
  delete: "DROP TABLE IF EXISTS orders CASCADE",
};

function createTableOrders() {
  return new Promise((resolve, reject) => {
    db.query(orders.create, (err) => {
      if (!err) return resolve({ message: "farmers table created" });
      return reject(err);
    });
  });
}

function deleteTableOrders() {
  return new Promise((resolve, reject) => {
    db.query(orders.delete, (err) => {
      if (!err) return resolve({ message: "farmers table deleted" });
      return reject(err);
    });
  });
}

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

function createTableProjects() {
  return new Promise((resolve, reject) => {
    db.query(projects.create, (err) => {
      if (!err) return resolve({ message: "investors table created" });
      return reject(err);
    });
  });
}

function deleteTableProjects() {
  return new Promise((resolve, reject) => {
    db.query(projects.delete, (err) => {
      if (!err) return resolve({ message: "investors table deleted" });
      return reject(err);
    });
  });
}

function createTableCustomers() {
  return new Promise((resolve, reject) => {
    db.query(customers.create, (err) => {
      if (!err) return resolve({ message: "investors table created" });
      return reject(err);
    });
  });
}

function deleteTableCustomers() {
  return new Promise((resolve, reject) => {
    db.query(customers.delete, (err) => {
      if (!err) return resolve({ message: "investors table deleted" });
      return reject(err);
    });
  });
}

function createAdmin() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise((resolve, reject) => {
    db.query(professionsals.insert, (err) => {
      if (!err) return resolve({ message: "Admin Created" });
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
  createTableProjects,
  deleteTableProjects,
  createTableCustomers,
  deleteTableCustomers,
  createTableOrders,
  deleteTableOrders,
  createAdmin,
};
