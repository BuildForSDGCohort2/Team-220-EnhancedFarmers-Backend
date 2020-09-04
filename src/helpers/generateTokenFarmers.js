import jwt from "jsonwebtoken";
// import config from "config";

const generateToken = (id, email, isAccepted) => {
  const token = jwt.sign(
    {
      id,
      email,
      isAccepted,
    },
    "secretTempKey",
  );
  return token;
};

export default generateToken;
