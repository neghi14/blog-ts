import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Listing from "../../../common/database/model/listing.model";
import ListingRepository from "../repository/listing.repository";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class CreateListingService implements Service<Request, Response, NextFunction> {
  constructor(private listingRepository: ListingRepository, private http: Http) {}
  async execute(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<unknown> {
    try {
      const { id } = req.params;
      const { article } = req.body;

      const newListingPayload: Listing = {
        list: id,
        article,
      };

      const check = await this.listingRepository.readOne(newListingPayload);
      if (check) return next(new ErrorUtility("Article already added to List", 400));

      const data = await this.listingRepository.createOne(newListingPayload);

      this.http.Response({
        res,
        status: "success",
        statuscode: 201,
        message: "Added to List",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
