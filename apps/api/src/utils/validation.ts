import { Request } from "express";
import * as z from "zod";
import { ServerError } from "./server-error.ts";
import { HTTPStatus } from "../constants/http.ts";

export function invariantValidateRequest<
  TSchema extends z.ZodObject<{
    params?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    body?: z.ZodTypeAny;
  }>,
>(req: Request, schema: TSchema): z.output<TSchema> {
  const result = schema.safeParse({
    params: req.params,
    query: req.query,
    body: req.body,
  });

  if (!result.success) {
    throw new ServerError(
      HTTPStatus.BAD_REQUEST,
      result.error?.message ?? "Unknown schema validation error",
      {
        validation: result.error,
      },
    );
  }

  return result.data;
}
