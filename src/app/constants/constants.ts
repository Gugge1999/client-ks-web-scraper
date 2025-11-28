import { ApiStatus } from "@models/api-status.model";
import { isDevMode } from "@angular/core";

export const INITIAL_API_STATUS: Readonly<ApiStatus> = {
  status: "pending",
  scrapingIntervalInMinutes: 0,
  memoryUsage: 0,
  uptime: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
};

export const isProduction = !isDevMode();

export const STACK_API_ERROR_OBJECT_PROPERTY = "stack";

export const CARD_DATE_FORMAT = "d MMMM yyyy - HH:mm:ss";

/** Samma som {@link CARD_DATE_FORMAT} fast om ett datum är ensiffrigt läggs en 0:a på i början. T.ex. blir 1 maj = 01 maj */
export const CARD_DATE_FORMAT_LEADING_ZERO = `d${CARD_DATE_FORMAT}`;
