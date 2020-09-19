import req from "supertest";
import "babel-polyfill";
import sql from "../../database/tables";
// import genToken from "../../helpers/genrateToken";

let server;
describe("Testing Professional End Points", () => {
  beforeEach(async () => {
    await sql.createTableProfessional();

    await sql.createAdmin();

    server = require("../../app");
  });

  const image = "../../uploads/pic.jpg";

  afterEach(async () => {
    await sql.deleteTableProfessional();

    await server.close();
  });

  describe("POST /", () => {
    let res;
    // let token;
    // const pro1 = {
    //   email: "mugabamuha@gmail.com",
    //   fname: "Rashid",
    //   lname: "Mugaba",
    //   contact: "0676976",
    //   residence: "Kampala",
    //   professional: "admin",
    //   password: "ammedi",
    //   is_admin: true,
    //   imageUrl: "/uploads/mara.jpg",
    // };
    const pro2 = {
      email: "mugaba@gmail.com",
      fname: "Rashid",
      lname: "Mugaba",
      contact: "0676976",
      residence: "Kampala",
      professional: "admin",
      password: "ammedi",
    };

    const data = new FormData();

    data.append("image", image);

    for (const i in pro2) {
      data.append(i, pro2[i]);
    }

    const exec = async () => {
      const res1 = await req(server)
        .post("/professionals/login")
        .send({ email: "mugabamuha@gamil.com", passowrd: "ammedi" });
      res = await req(server)
        .post("/professionals/signup")
        .set("x-access-token", res1.body.token)
        .send(data);
      return res;
    };
    it("should return 201 if a customer is success fully registered", async () => {
      res = await exec();

      //   console.log(res.body);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("status");
    });
    // it("should return 409 if customer email already exists", async () => {
    //   name = "MUGABA";
    //   email = "programmingwithrashid@gmail.com";
    //   password = "Rashid123";

    //   res = await exec();

    //   expect(res.status).toBe(409);
    // });
    // it("should return 400 if customer name or email for password is not given", async () => {
    //   name = "";
    //   email = "programmingwithrashid2@gmail.com";
    //   password = "Rashid123";

    //   res = await exec();

    //   expect(res.status).toBe(400);
    // });
  });
});
