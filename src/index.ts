import { Server } from "./common/config/server";
import express from "express";
import morgan from "morgan";

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization,"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  }
);
const server = new Server(app);
server.start();
