import { Response } from "express";

export default class Http {
  Response({
    res,
    statuscode,
    status,
    message,
    data,
  }: responseModel) {
    const response: Response = res.status(statuscode || 500).json({
      status,
      message,
      data,
    });
    return response;
  }
}

interface responseModel {
  res: Response;
  statuscode: number;
  status: "success" | "error";
  message: string;
  data?: any;
  token?: string;
}
