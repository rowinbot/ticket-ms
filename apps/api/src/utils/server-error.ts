import { HTTPStatus } from '../constants/http.ts';

export class ServerError extends Error {
  status: HTTPStatus;
  extraData?: Record<string, any>;

  constructor(
    status?: HTTPStatus,
    message?: string,
    extraData?: Record<string, any>,
  ) {
    super(message);
    this.status = status ?? HTTPStatus.INTERNAL_ERROR;
    this.extraData = extraData;
  }
}
