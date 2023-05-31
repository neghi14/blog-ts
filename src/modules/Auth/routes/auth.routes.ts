// import "reflect-metadata";
import { Request, Response, Router, NextFunction } from "express";
import { container } from "tsyringe";
import UserController from "../../User/controller/user.controller";
import UserAuthController from "../controller/userauth.controller";
import { isLoggedIn } from "../middleware";

const userAuthRouter: Router = Router();

const userController = container.resolve(UserController);
const userAuthController = container.resolve(UserAuthController);

userAuthRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  userAuthController.userLogin(req, res, next)
);

userAuthRouter.post("/register", (req: Request, res: Response, next: NextFunction) =>
  userController.postUser(req, res, next)
);

userAuthRouter.post("/reset-password", isLoggedIn, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Login Successful" });
});

userAuthRouter.post("/verify-email", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Login Successful" });
});

userAuthRouter.patch("delete-me", isLoggedIn, (req: Request, res: Response, next: NextFunction) =>
  userAuthController.userDelete(req, res, next)
);

userAuthRouter.patch("/change-password", isLoggedIn, (req: Request, res: Response, next: NextFunction) =>
  userAuthController.userPasswordChange(req, res, next)
);

userAuthRouter.patch("/edit-me", isLoggedIn, (req: Request, res: Response, next: NextFunction) =>
  userAuthController.userEdit(req, res, next)
);

export default userAuthRouter;
