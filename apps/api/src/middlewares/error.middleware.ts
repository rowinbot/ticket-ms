import { NextFunction, Request, Response } from "express";
import { AppController } from "../utils/app-controller.ts";
import { ServerError } from "../utils/server-error.ts";
import { HTTPStatus } from "../constants/http.ts";

export class ErrorMiddleware extends AppController {
  handleNotFound = (req: Request, res: Response): void => {
    this.setErrorResponse(res, HTTPStatus.NOT_FOUND);
  };

  handleGenericError = (
    error: ServerError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    const status = error.status ?? HTTPStatus.INTERNAL_ERROR;
    const extraData = error.extraData;
    console.error(`[${status}] - ${error.message}`, { extraData });
    this.setErrorResponse(res, status, error);
    next();
  };
}
