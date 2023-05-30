import { container } from "tsyringe";
import { Request, Response, Router } from "express";
import UserController from "../controller/user.controller";

const userRouter: Router = Router();

const userController = container.resolve(UserController);

userRouter.get("/all", (req: Request, res: Response) => userController.getAllUser(req, res));

userRouter.post("/", (req: Request, res: Response) => userController.postUser(req, res));

userRouter.get("/:id", (req: Request, res: Response) => userController.getSingleUser(req, res));

userRouter.patch("/:id", (req: Request, res: Response) => userController.patchUser(req, res));

userRouter.delete("/:id", (req: Request, res: Response) => userController.deleteUser(req, res));

export default userRouter;
