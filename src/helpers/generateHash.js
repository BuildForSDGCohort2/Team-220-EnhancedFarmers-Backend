import { hash, genSalt } from "bcrypt";

async function generatePassHash(password, email) {
  const salt = await genSalt(email.length);
  const newPassword = await hash(password, salt);
  return newPassword;
}
export default generatePassHash;
