import { InferOutput, integer, literal, number, object, pipe, union } from "valibot";

const uptimeSchema = object({
  years: pipe(number(), integer()),
  months: pipe(number(), integer()),
  days: pipe(number(), integer()),
  hours: pipe(number(), integer()),
  minutes: pipe(number(), integer()),
  seconds: pipe(number(), integer()),
});

export const apiStatusSchema = object({
  // TODO: Fixa
  status: union([literal("active"), literal("inactive"), literal("pending")]),
  scrapingIntervalInMinutes: pipe(number(), integer()),
  memoryUsage: pipe(number(), integer()),
  uptime: uptimeSchema,
});

export type ApiStatus = InferOutput<typeof apiStatusSchema>;
