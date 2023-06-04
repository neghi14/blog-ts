import bcrypt from "bcryptjs";

export const createHash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const compareHash = async (password: string, dbpassword: string) => {
  return await bcrypt.compare(password, dbpassword);
};
