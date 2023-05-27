import express from "express";

const commentRouter: express.Router = express.Router();

commentRouter.get("/all", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
commentRouter.post("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
commentRouter.get("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
commentRouter.patch("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
commentRouter.delete("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});

export default commentRouter;
