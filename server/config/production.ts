import dotenv from "dotenv";
dotenv.config();

export default {
  NODE_ENV: "production",
  port: 1337,
  mongo_uri: process.env.DATABASE_URL,
  pub_key: process.env.PUB_KEY,
  priv_key: process.env.PRI_KEY,
  refreshTtl: "1y",
  sessionTtl: "60000",
};
