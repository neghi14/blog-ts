import { container } from "tsyringe";
import express from "express";
import UserController from "../controller/user.controller";

const userRouter: express.Router = express.Router();

const userController = container.resolve(UserController);

userRouter.get(
  "/all",
  (req: express.Request, res: express.Response) =>
    userController.getAll(req, res)
);
userRouter.post("/", (req: express.Request, res: express.Response) =>
  userController.createOne(req, res)
);
userRouter.get(
  "/:id",
  (req: express.Request, res: express.Response) =>
    userController.getOne(req, res)
);
userRouter.patch(
  "/:id",
  (req: express.Request, res: express.Response) =>
    userController.updateOne(req, res)
);
userRouter.delete(
  "/:id",
  (req: express.Request, res: express.Response) =>
    userController.deleteOne(req, res)
);

export default userRouter;
