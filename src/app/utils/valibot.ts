import { isDevMode } from "@angular/core";
import { BaseIssue, BaseSchema, safeParse } from "valibot";

/** @param schema ska det vara **korrekt** värdet, alltså inte `ApiError` */
export function verifyResponse<T>(schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>, response: T): void {
  if (isDevMode()) {
    const result = safeParse(schema, response);

    if (result.success === false) {
      console.error("valibot error", result.issues);
    }
  }
}
