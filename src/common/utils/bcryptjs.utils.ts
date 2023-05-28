import bcrypt from "bcryptjs";

const createHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const compareHash = async (password: string, dbpassword: string) => {
  return await bcrypt.compare(password, dbpassword);
};

export default {
  createHash,
  compareHash,
};
