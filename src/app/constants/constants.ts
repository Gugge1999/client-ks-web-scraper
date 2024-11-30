import { ApiStatus } from "@models/api-status.model";

export const INITIAL_API_STATUS: Readonly<ApiStatus> = {
  status: "pending",
  scrapingIntervalInMinutes: 0,
  memoryUsage: "",
  uptime: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
} as const;

export const ERROR_API_STATUS: Readonly<ApiStatus> = {
  ...INITIAL_API_STATUS,
  status: "inactive",
} as const;

export const STACK_API_ERROR_PROPERTY = "stack";
