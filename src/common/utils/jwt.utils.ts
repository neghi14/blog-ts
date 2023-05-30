import jwt from "jsonwebtoken";
import { User } from "../database/model";
import config from "../config/config";

export const createToken = (data: User): string => {
  return jwt.sign({ data: data._id || "" }, config.jwt.secret, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, config.jwt.secret);
};
