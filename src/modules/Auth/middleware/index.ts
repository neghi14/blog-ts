import { injectable, container } from "tsyringe";
import LoggedIn from "./isLoggedIn";
import { NextFunction, Request, Response } from "express";

@injectable()
class AuthMiddleWare {
  constructor(private loggedIn: LoggedIn) {}
  async isLoggedIn(req: Request, res: Response, next: NextFunction) {
    await this.loggedIn.checkLogIn(req, res, next);
  }
}
const authMiddleware = container.resolve(AuthMiddleWare);

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) =>
  authMiddleware.isLoggedIn(req, res, next);
