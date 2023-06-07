import { Request, Response, NextFunction, Router } from "express";
import { container } from "tsyringe";
import LikesController from "../controller/likes.controller";

const likes = container.resolve(LikesController);

const likeRoute = Router();

likeRoute
  .get("/all", (req: Request, res: Response, next: NextFunction) => likes.readAll(req, res, next))
  .post("/new", (req: Request, res: Response, next: NextFunction) => likes.createOne(req, res, next))
  .get("/:id", (req: Request, res: Response, next: NextFunction) => likes.readOne(req, res, next))
  .patch("/:id", (req: Request, res: Response, next: NextFunction) => likes.updateOne(req, res, next))
  .delete("/:id", (req: Request, res: Response, next: NextFunction) => likes.deleteOne(req, res, next));

export default likeRoute;
