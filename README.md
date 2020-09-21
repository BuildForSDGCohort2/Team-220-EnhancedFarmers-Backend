# Team-220-EnhancedFarmers-Backend

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6506934b2237414b96668e79a7c26e31)](https://app.codacy.com/gh/BuildForSDGCohort2/Team-220-EnhancedFarmers-Backend?utm_source=github.com&utm_medium=referral&utm_content=BuildForSDGCohort2/Team-220-EnhancedFarmers-Backend&utm_campaign=Badge_Grade_Settings)

# heroku link

[heroku link](https://enhahancedfarmersback.herokuapp.com/)

## Run Code Like This

clone the repository
`git clone https://github.com/BuildForSDGCohort2/Team-220-EnhancedFarmers-Backend team220-back`

## install the the packages

### `npm install or yarn add`

## Set the environment variables

---

## windows

1.  ### set up the development environment
    1.set NODE_ENV=**development**
2.  ### set up the database configurations
    1. set dbname=**database_name**
    2. set password=**database_password**
    3. set user=**database_username**
    4. set host=**localhost**
3.  #### set up security configurations for config module
    1. set privatekey=**your_private_key**

---

## linux users

1.  set up the development environment
    1. export NODE_ENV=**development**
2.  set up the database configurations
    1. export dbname=**database_name**
    2. export password=**database_password**
    3. export user=**database_username**
    4. export host=**localhost**
3.  set up security configurations for config module
    1. export privatekey=**your_private_key**

---

Now Run the application with
`npm start`

---

# End Points....

| Method     | EndPoint                    | Description                         |
| ---------- | --------------------------- | ----------------------------------- |
| **Now **   | **For **                    | **Professionals**                   |
| **GET**    | /professionals              | get all professionals               |
| **POST**   | /professionals/signup       | register a professional             |
| **POST**   | /professionals/login        | signin a professional               |
| **GET**    | /professionals/:id          | get a particular professional       |
| **DELETE** | /professionals/:id          | delete a particular professional    |
| **Now **   | **For**                     | **Projects**                        |
| **GET**    | /projects                   | get all projects                    |
| **POST**   | /projects/create            | create a projects                   |
| **GET**    | /projects/:id/professionals | projects watched by a professioanal |
| **GET**    | /projects/:id/investors     | projects for an investoer           |
| **GET**    | /projects/:id               | get a particular projects           |
| **DELETE** | /projects/:id               | delete a particular project         |
| **Now**    | **For**                     | **Products**                        |
| **GET**    | /products                   | get all products                    |
| **POST**   | /products                   | create a products for sell          |
| **GET**    | /products/category          | all products with specific category |
| **GET**    | /products/:id               | get a particular product            |
| **DELETE** | /products/:id               | delete a particular product         |
| **Now**    | **For**                     | **investors**                       |
| **GET**    | /investors                  | get all investors                   |
| **POST**   | /investors/rigister         | register investor                   |
| **POST**   | /investors/login            | login investor                      |
| **PATCH**  | /investors/:id/contact      | investor change contact             |
| **GET**    | /investors/:id              | get a particular investor           |
| **DELETE** | /investors/:id              | delete a particular investor        |
| **Now**    | **For**                     | **Farmers**                         |
| **GET**    | /farmers                    | get all farmers                     |
| **POST**   | /farmers/signup             | register farmer                     |
| **POST**   | /farmers/login              | login farmer                        |
| **PATCH**  | /farmers/:id/approve        | approve farmer                      |
| **GET**    | /farmers/:id                | get a particular farmer             |
| **DELETE** | /farmers/:id                | delete a particular farmer          |
| **Now**    | **For**                     | **customers**                       |
| **GET**    | /customers                  | get all customers                   |
| **POST**   | /customers/signup           | register customer                   |
| **POST**   | /customers/login            | login customer                      |
| **PATCH**  | /customers/password         | change password                     |
| **GET**    | /customers/:id/orders       | get orders he has made              |
| **GET**    | /custoers/:id               | get a particular customer           |
| **DELETE** | /customers/:id              | delete a particular customer        |
