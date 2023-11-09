import "reflect-metadata";
import { Server } from "./common/config/server.config";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import Routes from "./common/routes/routes.config";
import databaseConfig from "./common/config/database.config";

const app: Application = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-refresh, x-session");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

new Routes(app).routes();
new Server(app).start();
databaseConfig.init();

export default app;
