import config from "../config/config";
import mongoose from "mongoose";
import "reflect-metadata";

const dbconnect = () => {
  mongoose
    .connect(config.database.url)
    .then(() => {
      console.log("Database has successfully connected");
    })
    .catch((err) => {
      console.log(`Database connection failed with error ${err}`);
    });
};

const createData = (model: any, data: any) => {
  try {
    return model.create(data);
  } catch (error) {
    return error;
  }
};

const getData = (model: any, options?: any) => {
  try {
    return model.find(options);
  } catch (error: any) {
    return error.message;
  }
};

const updateData = (model: any, data: any, payload: any) => {
  try {
    return model.findByIdAndUpdate(data, payload, { new: true });
  } catch (error: any) {
    return error.message;
  }
};

const deleteData = (model: any, data: any) => {
  try {
    return model.findByIdAndRemove(data);
  } catch (error: any) {
    error.message;
  }
};

export { dbconnect, createData, updateData, getData, deleteData };
