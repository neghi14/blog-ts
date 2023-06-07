import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import LikesRepository from "../repository/likes.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class UpdateLikeService implements Service<Request, Response, NextFunction> {
  constructor(private likeRepository: LikesRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id } = req.params;
      const data = await this.likeRepository.updateOne(id, req.body);
      if (!data) return next(new ErrorUtility("Like not Found!", 404));
      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Like Updated!",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}