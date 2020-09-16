import jwt from "jsonwebtoken";
import generateToken from "../../helpers/genrateToken";
import generateTokenFarmers from "../../helpers/generateTokenFarmers";
import generateHash from "../../helpers/generateHash";

require("babel-polyfill");

describe("Test Tokens", () => {
  it("It should return a token", () => {
    const obj = {
      id: 1,
      email: "mugaba@gmail.com",
      isAdmin: false,
    };

    const token = generateToken(obj.id, obj.email, obj.isAdmin);
    const decoded = jwt.verify(token, "secretTempKey");
    expect(decoded).toMatchObject(obj);
  });

  it("It should return a token", () => {
    const obj = {
      id: 1,
      email: "mugaba@gmail.com",
      isAccepted: false,
    };

    const token = generateTokenFarmers(obj.id, obj.email, obj.isAccepted);
    const decoded = jwt.verify(token, "secretTempKey");
    expect(decoded).toMatchObject(obj);
  });

  it("It should return a password hash", () => {
    const hash = "hkdfhkhfkshbv734nxu47cbh884";
    expect(generateHash("hello", "email@email.com")).not.toBe(hash);
  });
});
