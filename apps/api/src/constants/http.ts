export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  BAD_GATEWAY = 502,
}

export const responses: Record<HTTPStatus, string> = {
  [HTTPStatus.OK]: 'The request has succeeded',
  [HTTPStatus.BAD_REQUEST]: 'The server could not understand the request',
  [HTTPStatus.UNAUTHORIZED]: 'You are not authorized',
  [HTTPStatus.FORBIDDEN]: 'You are not allowed to do this',
  [HTTPStatus.NOT_FOUND]: 'Not found',
  [HTTPStatus.INTERNAL_ERROR]: 'An unknown server error occurred',
  [HTTPStatus.BAD_GATEWAY]: 'LimbicServer received an invalid response',
  [HTTPStatus.CREATED]:
    'The request has been fulfilled and resulted in a new resource being created',
  [HTTPStatus.NO_CONTENT]: ':)',
};
