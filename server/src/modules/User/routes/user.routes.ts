import { container } from "tsyringe";
import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controller/user.controller";

const userRouter: Router = Router();

const userController = container.resolve(UserController);

userRouter
  .get("/", (req: Request, res: Response, next: NextFunction) => userController.readAll(req, res, next))
  .post("/", (req: Request, res: Response, next: NextFunction) => userController.createOne(req, res, next))

  .get("/:id", (req: Request, res: Response, next: NextFunction) => userController.readOne(req, res, next))
  .patch("/:id", (req: Request, res: Response, next: NextFunction) => userController.updateOne(req, res, next))
  .delete("/:id", (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    userController.deleteOne(req, res, next)
  );

export default userRouter;
