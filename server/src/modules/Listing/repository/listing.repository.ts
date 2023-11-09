import { injectable } from "tsyringe";
import CRUD from "../../../common/interface/crud.interface";
import DatabaseQueryHelper from "../../../common/helpers/database.helper";
import listingSchema from "../../../common/database/schema/listing.schema";
import Listing from "../../../common/database/model/listing.model";

@injectable()
export default class ListingRepository implements CRUD {
  constructor(private databaseQuery: DatabaseQueryHelper) {}
  async readOne(params: Listing): Promise<any> {
    try {
      return await this.databaseQuery.readOne(listingSchema, params);
    } catch (error) {
      return error;
    }
  }
  async readAll(query: Record<string, any>): Promise<any> {
    try {
      return await this.databaseQuery.readAll(listingSchema, query);
    } catch (error) {
      return error;
    }
  }
  async createOne(payload: Listing): Promise<any> {
    try {
      return await this.databaseQuery.createOne(listingSchema, payload);
    } catch (error) {
      return error;
    }
  }
  async updateOne(params: string, payload: Listing): Promise<any> {
    try {
      return await this.databaseQuery.updateOne(listingSchema, params, payload);
    } catch (error) {
      return error;
    }
  }
  async deleteOne(params: string): Promise<any> {
    try {
      return await this.databaseQuery.deleteOne(listingSchema, params);
    } catch (error) {
      return error;
    }
  }
  async countAll(): Promise<any> {
    try {
      return await this.databaseQuery.countAll(listingSchema);
    } catch (error) {
      return error;
    }
  }
}
