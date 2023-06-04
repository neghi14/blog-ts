import { Model, FilterQuery, Document } from "mongoose";

const readOne = async (model: Model<Document>, params: FilterQuery<object>) => {
  try {
    return await model.findOne(params);
  } catch (error) {
    return error;
  }
};

const readAll = async (model: Model<Document>, query: FilterQuery<object>) => {
  try {
    const queryObj = { ...query };
    const queryDelete = ["sort", "limit", "skip"];
    const queryFilter = queryDelete.map((el) => delete queryObj[el]);

    //FILTER
    let queryStr = JSON.stringify(queryFilter);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //SORT
    let sort;
    if (queryObj.sort) {
      sort = queryObj.sort.split(",").join(" ");
    } else {
      sort = "createdAt";
    }

    //PAGINATION

    const page = queryObj.page * 1 || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    return await model.find(JSON.parse(queryStr)).sort(sort).limit(limit).skip(skip);
  } catch (error) {
    return error;
  }
};

const createOne = async (model: Model<Document>, payload: Document) => {
  try {
    return await model.create(payload);
  } catch (error) {
    return error;
  }
};

const updateOne = async (model: Model<Document>, params: Document<string>, payload: Document) => {
  try {
    return await model.findByIdAndUpdate(params, payload, { new: true });
  } catch (error) {
    return error;
  }
};

const deleteOne = async (model: Model<Document>, params: Document) => {
  try {
    return await model.findByIdAndRemove(params);
  } catch (error) {
    return error;
  }
};

export default { readOne, readAll, createOne, updateOne, deleteOne };
