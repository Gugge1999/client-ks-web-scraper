import { isDevMode } from "@angular/core";
import { array, boolean, InferOutput, isoTimestamp, nullable, object, pipe, safeParse, string, url, uuid } from "valibot";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyResponse(schema: any, response: any) {
  if (isDevMode()) {
    const result = safeParse(schema, response);

    if (!result.success) {
      console.error("valibot error", result.issues);
    }
  }

  return response as InferOutput<typeof schema>;
}
