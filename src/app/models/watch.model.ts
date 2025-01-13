import { isDevMode } from "@angular/core";
import { map, pipe as rxPipe } from "rxjs";
import {
  array,
  BaseIssue,
  BaseSchema,
  boolean,
  InferInput,
  InferOutput,
  isoTimestamp,
  nullable,
  object,
  pipe,
  safeParse,
  string,
  url,
  uuid,
} from "valibot";

export const scrapedWatch = object({
  name: string(),
  postedDate: pipe(string(), isoTimestamp()),
  link: pipe(string(), url()),
});

export const watchSchema = object({
  id: pipe(string(), uuid()),
  active: boolean(),
  added: pipe(string(), isoTimestamp()),
  label: string(),
  lastEmailSent: nullable(pipe(string(), isoTimestamp())),
  watchToScrape: pipe(string(), url()),
  notifications: array(pipe(string(), isoTimestamp())),
  watch: scrapedWatch,
});

export type Watch = InferOutput<typeof watchSchema>;

export function verifyResponseNy<T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: T) {
  return rxPipe(
    map(response => {
      if (isDevMode()) {
        const result = safeParse(schema, response);

        if (!result.success) {
          console.error("valibot error", result.issues);
        }
      }

      return response as InferInput<T>;
    }),
  );
}
