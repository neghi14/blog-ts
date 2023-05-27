import express from "express";
import config from "./config";
import { dbconnect } from "../utils/database";

export class Server {
  private app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }
  async start() {
    //Connect to db
    await dbconnect();

    //Test Endpoint
    this.app.all(
      "/api/v1/test",
      (req: express.Request, res: express.Response) => {
        res.status(200).json({
          message: "Endpoint Seems to be working Fine.",
        });
      }
    );
    this.app.listen(config.port, () => {
      console.log(`Application Successfully Connected on Port ${config.port}`);
    });
  }
}
