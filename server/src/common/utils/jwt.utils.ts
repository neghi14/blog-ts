import jwt from "jsonwebtoken";
import config from "config";

const pub_key = Buffer.from(config.get<string>("pub_key"), "base64").toString("ascii");
const pri_key = Buffer.from(config.get<string>("priv_key"), "base64").toString("ascii");

export const createToken = (data: object, options: jwt.SignOptions): string => {
  return jwt.sign(data, pri_key, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyToken = (token: string): object => {
  try {
    const decoded = jwt.verify(token, pub_key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: "",
    };
  }
};
