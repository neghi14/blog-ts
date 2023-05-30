// import "reflect-metadata";
import { Request, Response, Router, NextFunction } from "express";
import { container } from "tsyringe";
import UserController from "../../User/controller/user.controller";
import UserAuthController from "../controller/userauth.controller";
import { isLoggedIn } from "../middleware";

const userAuthRouter: Router = Router();

const userController = container.resolve(UserController);
const userAuthController = container.resolve(UserAuthController);

userAuthRouter.post("/login", (req: Request, res: Response) => userAuthController.userLogin(req, res));

userAuthRouter.post("/register", (req: Request, res: Response) => userController.postUser(req, res));

userAuthRouter.post("/reset-password", isLoggedIn, (req: Request, res: Response) => {
  res.status(200).json({ message: "Login Successful" });
});

userAuthRouter.post("/verify-email", (req: Request, res: Response) => {
  res.status(200).json({ message: "Login Successful" });
});

userAuthRouter.patch("delete-me", isLoggedIn, (req: Request, res: Response) => userAuthController.userDelete(req, res));

userAuthRouter.patch("/change-password", isLoggedIn, (req: Request, res: Response) =>
  userAuthController.userPasswordChange(req, res)
);

userAuthRouter.patch("/edit-me", isLoggedIn, (req: Request, res: Response) => userAuthController.userEdit(req, res));

export default userAuthRouter;
