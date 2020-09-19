import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (id, email, isAccepted) => {
  const token = jwt.sign(
    {
      id,
      email,
      isAccepted,
    },
    config.get("privatekey")
  );
  return token;
};

export default generateToken;
