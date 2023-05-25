import config from "./config";
import mongoose from "mongoose";

export default class MongoDB {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(config.database.url)
      .then(() => {
        console.log(`database successfully connected`);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }
}
