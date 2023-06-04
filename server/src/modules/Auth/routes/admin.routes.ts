import express from "express";

const adminRouter: express.Router = express.Router();

adminRouter.post("/login", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Login Successful" });
});
adminRouter.post(
  "/reset-password",
  (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Login Successful" });
  }
);

export default adminRouter;