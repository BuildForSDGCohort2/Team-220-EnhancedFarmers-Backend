import jwt from "jsonwebtoken";
import config from "config";
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
    const decoded = jwt.verify(token, config.get("privatekey"));
    expect(decoded).toMatchObject(obj);
  });

  it("It should return a token", () => {
    const obj = {
      id: 1,
      email: "mugaba@gmail.com",
      isAccepted: false,
    };

    const token = generateTokenFarmers(obj.id, obj.email, obj.isAccepted);
    const decoded = jwt.verify(token, config.get("privatekey"));
    expect(decoded).toMatchObject(obj);
  });

  it("It should return a password hash", async () => {
    const hash = "hkdfhkhfkshbv734nxu47cbh884";
    const result = await generateHash("hello");
    expect(result).not.toBe(hash);
  });
});
