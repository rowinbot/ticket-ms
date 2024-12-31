import { HTTPStatus } from "../constants/http.ts";
import { ServerError } from "./server-error.ts";

const createError = (
  message: string,
  status?: HTTPStatus,
  extraData?: Record<string, any>,
) =>
  status //
    ? new ServerError(status, message, extraData)
    : new Error(message);

export function invariant(
  condition: unknown,
  message?: string,
  status?: HTTPStatus,
  extraData?: Record<string, any>,
): asserts condition {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV !== "production") {
    if (message === undefined) {
      const error = new Error("invariant requires an error message argument");
      const stack = error.stack?.split("\n").slice(2).join("\n") ?? "";
      console.log(stack);
      throw error;
    }
  }

  if (!condition) {
    let error;
    if (message === undefined) {
      error = createError(
        "Minified exception occurred; use the non-minified dev environment " +
          "for the full error message and additional helpful warnings",
        status,
        extraData,
      );
    } else {
      error = createError(message, status, extraData);
      error.name = `${status ?? "Internal App issue"}`;
    }
    throw error;
  }
}
