import express from "express";
import config from "../config/config";
import blogRouter from "../../modules/Blog/routes/blog.routes";
import commentRouter from "../../modules/Comment/routes/comment.routes";
import userRouter from "../../modules/User/routes/user.routes";
import adminRouter from "../../modules/Auth/routes/admin.routes";
import userAuthRouter from "../../modules/Auth/routes/auth.routes";

export class Routes {
  app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
  }
  routes() {
    this.app.use(`${config.url.api}/blog`, blogRouter);
    this.app.use(`${config.url.api}/comment`, commentRouter);
    this.app.use(`${config.url.api}/user`, userRouter);

    //AUTH ENDPOINT
    this.app.use(`${config.url.api}/admin`, adminRouter);
    this.app.use(`${config.url.api}/auth`, userAuthRouter);

    //Error Handling
    this.app.all("*", (req: express.Request, res: express.Response) => {
      res.status(404).json({
        message: "Sorry, but that doesn't exist on this server!",
      });
    });
  }
}
