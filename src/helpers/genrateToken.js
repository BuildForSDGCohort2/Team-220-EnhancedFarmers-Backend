import jwt from "jsonwebtoken";
// import config from "config";

const generateToken = (id, email, isAdmin) => {
  const token = jwt.sign(
    {
      id,
      email,
      isAdmin,
    },
    "secretTempKey",
  );
  return token;
};

export default generateToken;
