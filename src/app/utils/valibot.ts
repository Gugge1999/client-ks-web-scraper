import { isDevMode } from "@angular/core";
import { BaseSchema, BaseIssue, safeParse } from "valibot";

export function verifyResponse<T>(schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>, response: T): void {
  if (isDevMode()) {
    const result = safeParse(schema, response);

    if (!result.success) {
      console.error("valibot error", result.issues);
    }
  }
}
