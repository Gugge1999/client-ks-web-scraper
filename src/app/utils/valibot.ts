import { isDevMode } from "@angular/core";
import { BaseSchema, BaseIssue, safeParse } from "valibot";

// TODO: Flytta till egen funktion eller egen klass
export function verifyResponse<T>(schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>, response: T): void {
  if (isDevMode()) {
    const result = safeParse(schema, response);

    if (!result.success) {
      console.error("valibot error", result.issues);
    }
  }
}
