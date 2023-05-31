import { container } from "tsyringe";
import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controller/user.controller";

const userRouter: Router = Router();

const userController = container.resolve(UserController);

userRouter.get("/all", (req: Request, res: Response, next: NextFunction) => userController.getAllUser(req, res, next));

userRouter.post("/", (req: Request, res: Response, next: NextFunction) => userController.postUser(req, res, next));

userRouter
  .get("/:id", (req: Request, res: Response, next: NextFunction) => userController.getSingleUser(req, res, next))
  .patch("/:id", (req: Request, res: Response, next: NextFunction) => userController.patchUser(req, res, next))
  .delete("/:id", (req: Request, res: Response, next: NextFunction) => userController.deleteUser(req, res, next));

export default userRouter;
