import { NextFunction, Request, Response, Application } from "express";

// import blogRouter from "../../modules/Blog/routes/blog.routes";
import commentRouter from "../../modules/Comment/routes/comment.routes";
import userRouter from "../../modules/User/routes/user.routes";
// import adminRouter from "../../modules/Auth/routes/admin.routes";
// import userAuthRouter from "../../modules/Auth/routes/auth.routes";
import ErrorInterface from "../interface/error.interface";
import sessionRoute from "../../modules/Session/routes/session.routes";
import Http from "../utils/http.utils";
import authRoute from "../../modules/User/routes/auth/auth.routes";

export class Routes {
  app: Application;
  http: any;
  constructor(app: Application) {
    this.app = app;
    this.http = new Http();
  }
  routes() {
    this.app.get("/api/v1/health-check", (req: Request, res: Response) => {
      res.sendStatus(200);
    });
    //this.app.use(`/api/v1/blog`, blogRouter);
    this.app.use(`/api/v1/comment`, commentRouter);
    this.app.use(`/api/v1/user`, userRouter);
    this.app.use("/api/v1/sessions", sessionRoute);

    //AUTH ENDPOINT
    this.app.use("/api/v1/auth", authRoute);
    //this.app.use(`${config.url.api}/auth`, userAuthRouter);

    //Invalid Route Error Handling
    this.app.all("*", (req: Request, res: Response) => {
      res.status(404).json({
        message: "Sorry, but that doesn't exist on this server!",
      });
    });

    //Catch All Error
    this.app.use((err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
      err.status = err.status || "failed";
      err.statusCode = err.statusCode || 500;
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    });
  }
}
