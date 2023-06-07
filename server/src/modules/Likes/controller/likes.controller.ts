import { injectable } from "tsyringe";
import CONTROLLER from "../../../common/interface/controller.interface";
import { NextFunction, Request, Response } from "express";
import GetLikeService from "../services/get.like.services";
import GetLikesService from "../services/get.likes.services";
import CreateLikeService from "../services/create.like.services";
import UpdateLikeService from "../services/update.like.services";
import DeleteLikeService from "../services/delete.like.services";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export default class LikesController implements CONTROLLER<Request, Response, NextFunction> {
  constructor(
    private getLike: GetLikeService,
    private getLikes: GetLikesService,
    private createLike: CreateLikeService,
    private updateLike: UpdateLikeService,
    private deleteLike: DeleteLikeService
  ) {}
  async readOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getLike.execute(req, res, next);
  }
  async readAll(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.getLikes.execute(req, res, next);
  }
  async createOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.createLike.execute(req, res, next);
  }
  async updateOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.updateLike.execute(req, res, next);
  }
  async deleteOne(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<any> {
    await this.deleteLike.execute(req, res, next);
  }
}
