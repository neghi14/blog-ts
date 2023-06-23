import { injectable } from "tsyringe";

import { NextFunction, Request, Response } from "express";

import CreateLikeService from "../services/create.like.services";

import DeleteLikeService from "../services/delete.like.services";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export default class LikesController {
  constructor(
    private createLike: CreateLikeService,

    private deleteLike: DeleteLikeService
  ) {}

  async createOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.createLike.execute(req, res, next);
  }
  async deleteOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.deleteLike.execute(req, res, next);
  }
}
