import express from "express";
import BlogController from "../controller/blog.controller";
import { container } from "tsyringe";

const blogRouter: express.Router = express.Router();
const blogController = container.resolve(BlogController);

blogRouter.get("/all", (req: express.Request, res: express.Response) =>
  blogController.getAll(req, res)
);
blogRouter.post("/", (req: express.Request, res: express.Response) =>
  blogController.createBlog(req, res)
);
blogRouter.get("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
blogRouter.patch("/:id", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Shit works" });
});
blogRouter.delete("/:id", (req: express.Request, res: express.Response) =>
  blogController.removeBlog(req, res)
);

export default blogRouter;
