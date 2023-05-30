// import "reflect-metadata";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import UserController from "../../User/controller/user.controller";
import UserAuthController from "../controller/userauth.controller";

const userAuthRouter: Router = Router();

const userController = container.resolve(UserController);
const userAuthController = container.resolve(UserAuthController);

userAuthRouter.post("/login", (req: Request, res: Response) =>
  userAuthController.userLogin(req, res)
);
userAuthRouter.post("/register", (req: Request, res: Response) =>
  userController.createOne(req, res)
);
userAuthRouter.post(
  "/reset-password",
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);
userAuthRouter.post(
  "/verify-email",
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);
userAuthRouter.patch("delete-me", (req: Request, res: Response) => {
  res.status(200).json({ message: "Login Successful" });
});
userAuthRouter.patch(
  "/change-password",
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);
userAuthRouter.patch("/edit-me", (req: Request, res: Response) => {
  res.status(200).json({ message: "Login Successful" });
});

export default userAuthRouter;
