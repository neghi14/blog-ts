import { NextFunction, Request, Response, Application } from "express";
import ErrorInterface from "../interface/error.interface";
import blogRouter from "../../modules/Blog/routes/blog.routes";
import listRouter from "../../modules/List/routes/list.routes";
import userRouter from "../../modules/User/routes/user.routes";
import authRouter from "../../modules/User/routes/auth/auth.routes";

export default class Routes {
  app;
  constructor(app: Application) {
    this.app = app;
  }
  routes() {
    this.app.get("/api/v1/health-check", (req: Request, res: Response) => {
      res.sendStatus(200);
    });

    this.app.use("/api/v1/blogs", blogRouter);
    this.app.use("/api/v1/lists", listRouter);
    this.app.use("/api/v1/users", userRouter);
    this.app.use("/api/v1/auth", authRouter);

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
