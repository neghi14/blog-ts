import express from "express";
import BlogController from "../controller/blog.controller";
import { container } from "tsyringe";
import BlogCommentController from "../controller/blogComment.controller";


const blogRouter: express.Router = express.Router();

const blogController = container.resolve(BlogController);

const blogCommentController = container.resolve(BlogCommentController);

blogRouter.get("/all", (req: express.Request, res: express.Response) => blogController.getAll(req, res));

blogRouter.post("/", (req: express.Request, res: express.Response) => blogController.postBlog(req, res));

blogRouter.get("/:id", (req: express.Request, res: express.Response) => blogController.getOne(req, res));

blogRouter.patch("/:id", (req: express.Request, res: express.Response) => blogController.patchBlog(req, res));

blogRouter.delete("/:id", (req: express.Request, res: express.Response) => blogController.deleteBlog(req, res));

blogRouter.get("/:slug/comment", (req: express.Request, res: express.Response) =>
  blogCommentController.getBlogComment(req, res)
);

blogRouter.post("/:slug/comment", (req: express.Request, res: express.Response) =>
  blogCommentController.postBlogComment(req, res)
);

export default blogRouter;
