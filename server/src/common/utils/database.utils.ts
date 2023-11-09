import { Model } from "mongoose";

const readOne = async (model: Model<any>, params: object) => {
  try {
    return await model.findOne(params);
  } catch (error: any) {
    error.message;
  }
};

const readAll = async (model: Model<any>, query: Record<string, any>) => {
  try {
    const filterObj = { ...query };
    const queryObj = { ...query };
    const queryDelete = ["sort", "limit", "skip"];
    queryDelete.map((el) => delete filterObj[el]);

    //FILTER
    let queryStr = JSON.stringify(filterObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //SORT
    let sort;
    if (queryObj.sort) {
      sort = queryObj.sort.split(",").join(" ");
    } else {
      sort = "created_at";
    }

    //PAGINATION
    const skip = queryObj.skip * 1 || 1;
    const limit = query.limit * 1 || 10;
    const page = (skip - 1) * limit;

    return await model.find(JSON.parse(queryStr)).sort(sort).skip(page).limit(limit);
  } catch (error: any) {
    error.message;
  }
};

const createOne = async (model: Model<any>, payload: object) => {
  try {
    return await model.create(payload);
  } catch (error: any) {
    error.message;
  }
};

const updateOne = async (model: Model<any>, params: string, payload: object) => {
  try {
    return await model.findByIdAndUpdate(params, payload, { new: true });
  } catch (error: any) {
    error.message;
  }
};

const deleteOne = async (model: Model<any>, params: string) => {
  try {
    return await model.findByIdAndRemove(params);
  } catch (error: any) {
    error.message;
  }
};

const countAll = async (model: Model<any>) => {
  try {
    return await model.countDocuments();
  } catch (error: any) {
    error.message;
  }
};

export { readOne, readAll, createOne, updateOne, deleteOne, countAll };
