import { Request, Response, Router } from "express";
import { container } from "tsyringe";
import CommentController from "../controller/comment.controller";

const commentController = container.resolve(CommentController);

const commentRouter: Router = Router();

commentRouter.get("/all", (req: Request, res: Response) => commentController.getAll(req, res));

commentRouter.post("/", (req: Request, res: Response) => commentController.postComment(req, res));

commentRouter.get("/:id", (req: Request, res: Response) => commentController.getOne(req, res));

commentRouter.patch("/:id", (req: Request, res: Response) => commentController.patchComment(req, res));

commentRouter.patch("/restrict/:id", (req: Request, res: Response) => commentController.adminRestrictComment(req, res));

commentRouter.delete("/:id", (req: Request, res: Response) => commentController.deleteComment(req, res));

export default commentRouter;
