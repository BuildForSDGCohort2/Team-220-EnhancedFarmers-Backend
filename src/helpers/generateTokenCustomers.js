import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (id, email, username) => {
  const token = jwt.sign(
    {
      id,
      email,
      username,
    },
    config.get("privatekey")
  );
  return token;
};

export default generateToken;
