import { injectable } from "tsyringe";
import Service from "../../../common/interface/service.interface";
import { NextFunction, Request, Response } from "express";
import ListingRepository from "../repository/listing.repository";
import Http from "../../../common/utils/http.utils";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import ErrorUtility from "../../../common/helpers/error.helper";

@injectable()
export default class DeleteListingService implements Service<Request, Response, NextFunction>{
    constructor(
        private listingRepository: ListingRepository,
        private http: Http
    ) { }
    async execute(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<unknown> {
        try {
            const { listing_id } = req.params;

            const data = await this.listingRepository.deleteOne(listing_id);
            if (!data) return next(new ErrorUtility("Article not found in List", 404));

            this.http.Response({
                res,
                status: "success",
                statuscode: 200,
                message: "Article Removed!"
            })
        } catch (error) {
            return next(error)
        }
    }
}