import { NextFunction, Request, Response } from "express";

export const ControllerHelper = (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    return next(error);
  }
};
