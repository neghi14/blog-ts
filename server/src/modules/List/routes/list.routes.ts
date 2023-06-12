import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import ListController from "../controller/list.controller";

const listRouter: Router = Router();
const listController = container.resolve(ListController);

listRouter
  .get("/", (req: Request, res: Response, next: NextFunction) => listController.getLists(req, res, next))
  .post("/", (req: Request, res: Response, next: NextFunction) => listController.createList(req, res, next))
  .get("/:id", (req: Request, res: Response, next: NextFunction) => listController.getList(req, res, next))
  .patch("/:id", (req: Request, res: Response, next: NextFunction) => listController.updateList(req, res, next));

export default listRouter;
