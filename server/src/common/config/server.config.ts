import { Request, Response, Application } from "express";
import config from "config";
import { logger } from "../utils/logger.utils";

export class Server {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }
  async start() {
    this.app.listen(config.get("port"), () => {
      logger.info(`Application Successfully Connected on Port ${config.get("port")}`);
    });
  }
}
