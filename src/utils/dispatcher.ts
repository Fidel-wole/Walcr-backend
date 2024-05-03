/* eslint-disable prettier/prettier */
import appConfig from "../config/app";
import { Response } from "express";
export default class {
  static DispatchSuccessMessage(res: Response, message: string, data?: any) {
    return res.status(200).json({
      code: 200,
      status: "OK",
      message: message,
      data,
    });
  }
  static DispatchCustomMessage(
    res: Response,
    message: string,
    statusCode: number,
    status?: string,
    data?: any
  ) {
    res.status(statusCode).json({
      code: statusCode,
      status,
      message: message,
      data,
    });
  }

  static DispatchErrorMessage(res: Response, message: string) {
    res.status(500).json({
      code: appConfig.error.internalServerError.code,
      status: appConfig.error.internalServerError.description,
      message: message,
    });
  }
  static SendUnAuthorizedMessage(res: Response) {
    res.status(403).json({
      code: appConfig.error.forbidden.code,
      status: appConfig.error.forbidden.description,
      message: appConfig.error.forbidden.message,
    });
  }
  static DispatchNotFoundMessage(res: Response) {
    res.status(404).json({
      code: appConfig.error.notFound.code,
      message: appConfig.error.notFound.description,
    });
  }
  static SendNotImplementedError(res: Response) {
    res.status(501).json({
      code: appConfig.error.notImplemented.code,
      message: appConfig.error.notImplemented.description,
    });
  }
}
