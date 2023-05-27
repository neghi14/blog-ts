import express from "express";

const userRouter: express.Router = express.Router();

userRouter.get("/all", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
userRouter.post("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
userRouter.get("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
userRouter.patch("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
userRouter.delete("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});

export default userRouter;
