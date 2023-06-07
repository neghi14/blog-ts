import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import CommentController from "../controller/comment.controller";

const commentController = container.resolve(CommentController);

const commentRouter: Router = Router();

commentRouter.get("/all", (req: Request, res: Response, next: NextFunction) =>
  commentController.readAll(req, res, next)
);

commentRouter.post("/", (req: Request, res: Response, next: NextFunction) =>
  commentController.createOne(req, res, next)
);

commentRouter
  .get("/:id", (req: Request, res: Response, next: NextFunction) => commentController.readOne(req, res, next))
  .patch("/:id", (req: Request, res: Response, next: NextFunction) => commentController.updateOne(req, res, next))
  .delete("/:id", (req: Request, res: Response, next: NextFunction) => commentController.deleteOne(req, res, next));

commentRouter.patch("/restrict/:id", (req: Request, res: Response, next: NextFunction) =>
  commentController.adminRestrictComment(req, res, next)
);

export default commentRouter;
