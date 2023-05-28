import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL || "",
  },
  url: {
    api: process.env.BASE_URL || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
};
