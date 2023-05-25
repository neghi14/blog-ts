import express from "express";
import { routesConfig } from "./routes";

export class BlogRoutes extends routesConfig {
  constructor(app: express.Application) {
    super(app, "BlogRoutes");
  }
  configureRoutes(): express.Application {
    this.app
      .route("/api/v1/blogs")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).json({ message: "Success" });
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).json({ message: "Success" });
      });
    this.app
      .route("/api/v1/blogs/:blogId")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).json({ message: "Success" });
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).json({ message: "Success" });
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).json({ message: "Success" });
      });
    return this.app;
  }
}
