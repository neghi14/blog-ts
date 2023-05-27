import express from "express";

const blogRouter: express.Router = express.Router();

blogRouter.get("/all", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
blogRouter.post("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
blogRouter.get("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
blogRouter.patch("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
blogRouter.delete("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});

export default blogRouter;
