import { Request, Response, NextFunction, Router } from "express";
import BlogController from "../controller/blog.controller";
import { container } from "tsyringe";
import BlogCommentController from "../controller/blogComment.controller";
import { isLoggedIn } from "../../Auth/middleware";

const blogRouter: Router = Router();

const blogController = container.resolve(BlogController);
const blogCommentController = container.resolve(BlogCommentController);

blogRouter.get("/all", (req: Request, res: Response) => blogController.getAll(req, res));

blogRouter.post("/", (req: Request, res: Response) => blogController.postBlog(req, res));

blogRouter.get("/:id", (req: Request, res: Response) => blogController.getOne(req, res));

blogRouter.patch("/:id", (req: Request, res: Response) => blogController.patchBlog(req, res));

blogRouter.delete("/:id", (req: Request, res: Response) => blogController.deleteBlog(req, res));

blogRouter.get("/:slug/comment", isLoggedIn, (req: Request, res: Response) =>
  blogCommentController.getBlogComment(req, res)
);

blogRouter.post("/:slug/comment", isLoggedIn, (req: Request, res: Response) =>
  blogCommentController.postBlogComment(req, res)
);

export default blogRouter;
