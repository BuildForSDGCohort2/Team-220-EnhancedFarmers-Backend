import { hash, genSalt } from "bcrypt";

function generatePassHash(password) {
  const newPassword =  hash(password, 10);
  return newPassword;
}
export default generatePassHash;
