import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import ErrorUtility from "../helpers/error.helper";
import { JwtObject, verifyToken, createToken } from "../utils/jwt.utils";
import config from "config";

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Check the header
    const session_token = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refresh_token = get(req, "headers.x-refresh");

    if (!session_token) return next(new ErrorUtility("Please login", 401));

    const decoded: JwtObject = verifyToken(session_token);

    if (decoded.decoded) {
      res.locals.user = decoded.decoded.user;
      next();
    }
    if (!decoded.valid && refresh_token) {
      const { decoded, valid } = verifyToken(refresh_token as string);
      if (!valid) return next(new ErrorUtility("Session Expired, Login again", 401));
      const session_exp = config.get<string>("sessionTtl");
      const newSession = createToken({ user: decoded }, { expiresIn: session_exp });
      res.locals.user = decoded.user;
      res.setHeader("x-refresh", refresh_token);
      res.setHeader("x-session", newSession);
      next();
    }
  } catch (error) {
    return next(error);
  }
};

export function verifyLogin() {
  return (req: Request, res: Response, next: NextFunction) => verifyAuth(req, res, next);
}
