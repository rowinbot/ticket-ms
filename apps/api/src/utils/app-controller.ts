import { Request, Response } from "express";
import { HTTPStatus, responses } from "../constants/http.ts";

export abstract class AppController {
  constructor() {}

  getSingleHeader(req: Request, header: string): string | null {
    const value =
      req.headers[header] ?? req.headers[header.toLowerCase()] ?? null;
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  }

  setSuccessResponse(res: Response, data: any): void {
    res.status(HTTPStatus.OK);
    res.json({ success: true, data });
  }

  setErrorResponse(
    res: Response,
    status?: HTTPStatus,
    error?: unknown,
    extraData?: Record<string, any>,
  ): void {
    const s = status ?? HTTPStatus.INTERNAL_ERROR;
    res.status(s);
    const e = error ?? responses[s];
    res.json({ success: false, error: e, ...(extraData || {}) });
  }
}
