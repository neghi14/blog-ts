import express from "express";

const userAuthRouter: express.Router = express.Router();

userAuthRouter.post("/login", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Login Successful" });
});
userAuthRouter.post(
  "/reset-password",
  (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);
userAuthRouter.post(
  "/verify-email",
  (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);
userAuthRouter.patch(
  "delete-me",
  (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);
userAuthRouter.patch(
  "/change-password",
  (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);
userAuthRouter.patch(
  "/edit-me",
  (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);

export default userAuthRouter;
