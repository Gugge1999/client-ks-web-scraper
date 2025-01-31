import { array, boolean, InferOutput, isoTimestamp, nullable, object, pipe, string, url, uuid } from "valibot";

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
  latestWatch: scrapedWatch,
});

// OBS! Låt det vara ett interface. Om det är "type" kommer alla props att expanderas vid hover istället för att visa "Watch"
export interface Watch extends InferOutput<typeof watchSchema> {}
