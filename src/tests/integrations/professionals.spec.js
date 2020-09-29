import req from "supertest";
import sql from "../../database/tables";

import generateToken from "../../helpers/genrateToken";
import "babel-polyfill";

let server;
describe("Testing Professional End Points", () => {
  beforeEach(async () => {
    // jest.setTimeout(15000);
    await sql.createTableProfessional();
    await sql.createAdmin();

    server = require("../../app");
  });

  const image = `${__dirname}/../../../uploads/pic.jpg`;

  afterEach(async () => {
    await sql.deleteTableProfessional();

    await server.close();
  });

  describe("POST /", () => {
    let res;
    let token;

    const pro2 = {
      email: "mugaba@gmail.com",
      fname: "Rashid",
      lname: "Mugaba",
      contact: "0676976",
      residence: "Kampala",
      profession: "admin",
      password: "ammedi",
    };
    beforeEach(async () => {
      token = await generateToken(1, "mugabamuha@gmail.com", 1);
    });

    const exec = async () =>
      await req(server)
        .post("/professionals/signup")
        .set("x-access-token", token)
        .field("email", pro2.email)
        .field("fname", pro2.fname)
        .field("lname", pro2.lname)
        .field("contact", pro2.contact)
        .field("residence", pro2.residence)
        .field("profession", pro2.profession)
        .field("password", pro2.password)
        .attach("image", image, { contentType: "application/octet-stream" });

    const exec1 = async () =>
      await req(server)
        .post("/professionals/signup")
        .set("x-access-token", token)
        .send(pro2);

    const exec2 = async () =>
      await req(server)
        .post("/professionals/signup")
        .set("x-access-token", token)
        .field("email", "")
        .field("fname", pro2.fname)
        .field("lname", pro2.lname)
        .field("contact", pro2.contact)
        .field("residence", pro2.residence)
        .field("profession", pro2.profession)
        .field("password", pro2.password)
        .attach("image", image, { contentType: "application/octet-stream" });

    const exec3 = async () =>
      await req(server)
        .post("/professionals/signup")
        .set("x-access-token", token)
        .field("email", "mugabamuha@gmail.com")
        .field("fname", pro2.fname)
        .field("lname", pro2.lname)
        .field("contact", pro2.contact)
        .field("residence", pro2.residence)
        .field("profession", pro2.profession)
        .field("password", pro2.password)
        .attach("image", image, { contentType: "application/octet-stream" });

    it("should return 201 if a customer is success fully registered", async () => {
      res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("status");
    });

    it("should return 400 if image is not uploaded", async () => {
      res = await exec1();

      expect(res.status).toBe(400);
    });

    it("should return 400 if any field is not given", async () => {
      res = await exec2();

      expect(res.status).toBe(400);
    });

    it("should return 400 professional already exists", async () => {
      res = await exec3();

      expect(res.status).toBe(400);
    });
  });

  describe("POST Login a Professional /", () => {
    let res;
    let token;

    const pro2 = {
      email: "mugaba@gmail.com",
      fname: "Rashid",
      lname: "Mugaba",
      contact: "0676976",
      residence: "Kampala",
      profession: "admin",
      password: "ammedi",
    };
    beforeEach(async () => {
      token = await generateToken(1, "mugabamuha@gmail.com", 1);

      const res1 = await req(server)
        .post("/professionals/signup")
        .set("x-access-token", token)
        .field("email", pro2.email)
        .field("fname", pro2.fname)
        .field("lname", pro2.lname)
        .field("contact", pro2.contact)
        .field("residence", pro2.residence)
        .field("profession", pro2.profession)
        .field("password", pro2.password)
        .attach("image", image, { contentType: "application/octet-stream" });
      return res1;
    });

    const exec1 = async () =>
      await req(server).post("/professionals/login").send({
        email: "mugaba@gmail.com",
        password: "ammedi",
      });

    const exec2 = async () =>
      await req(server).post("/professionals/login").send({
        email: "mugaba@gmail.com",
        password: "ammed",
      });

    const exec3 = async () =>
      await req(server).post("/professionals/login").send({
        email: "mugab@gmail.com",
        password: "ammedi",
      });

    const exec4 = async () =>
      await req(server).post("/professionals/login").send({
        email: "mugab@gmail.com",
        password: "",
      });

    it("should return 200 if the professional logins successfully", async () => {
      res = await exec1();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("status");
    });

    it("should return 400 if password is wrongle ", async () => {
      res = await exec2();

      expect(res.status).toBe(400);
    });

    it("should return 400 if email is wrongle", async () => {
      res = await exec3();

      expect(res.status).toBe(400);
    });

    it("should return 400 if email or password is not given", async () => {
      res = await exec4();

      expect(res.status).toBe(400);
    });
  });
});
