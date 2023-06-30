import { injectable } from "tsyringe";

import { NextFunction, Request, Response } from "express";

import CreateLikeService from "../services/create.like.services";

import DeleteLikeService from "../services/delete.like.services";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import GetLikesService from "../services/get.likes.services";

@injectable()
export default class LikesController {
  constructor(
    private createLike: CreateLikeService,
    private getLikes: GetLikesService,
    private deleteLike: DeleteLikeService
  ) {}

  async createOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.createLike.execute(req, res, next);
  }
  async readAll(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getLikes.execute(req, res, next);
  }
  async deleteOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.deleteLike.execute(req, res, next);
  }
}
