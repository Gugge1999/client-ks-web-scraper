import { BaseIssue, BaseSchema, safeParse } from "valibot";
import { isProduction } from "@constants/constants";

/** @param schema ska det vara **korrekt** värdet från API:et, alltså inte `ApiError`
 *  @param response är det som ska valideras från API:et */
export function verifyResponse<T>(schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>, response: T): void {
  if (isProduction) {
    return;
  }

  const result = safeParse(schema, response);
  if (result.success === false) {
    console.error("valibot error. Issues:", result.issues);
  }
}
