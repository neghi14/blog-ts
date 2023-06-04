import mongoose, { Mongoose } from "mongoose";
import { logger } from "../utils/logger.utils";
import config from "config";

class Database {
  database: Mongoose;
  constructor(database: Mongoose) {
    this.database = database;
  }
  init() {
    this.database
      .connect(config.get("mongo_uri"))
      .then(() => {
        logger.info("Database has successfully connected");
      })
      .catch((err) => {
        logger.error(`Database connection failed with error ${err}`);
      });
  }
}

export default new Database(mongoose);
