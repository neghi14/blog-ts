import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import SessionController from "../controller/session.controller";

const session = container.resolve(SessionController);
const sessionRoute = Router();

sessionRoute
  .get("/all", (req: Request, res: Response, next: NextFunction) => session.readAll(req, res, next))
  .get("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => session.readOne(req, res, next))
  .post("/new", (req: Request, res: Response, next: NextFunction) => session.createOne(req, res, next))
  .patch("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) => session.updateOne(req, res, next))
  .delete("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    session.deleteOne(req, res, next)
  );

export default sessionRoute;
