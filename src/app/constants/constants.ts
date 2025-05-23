import { animate, style, transition, trigger } from "@angular/animations";
import { ApiStatus } from "@models/api-status.model";

export const INITIAL_API_STATUS: ApiStatus = {
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
} as const;

export const STACK_API_ERROR_PROPERTY = "stack";

export const CARD_DATE_FORMAT = "d MMMM yyyy - HH:mm:ss";

export const fadeInAnimation = trigger("fadeInAnimation", [
  transition(":enter", [
    style({
      opacity: 0,
    }),
    animate("500ms ease-in-out", style({ opacity: 1 })),
  ]),
  transition(":leave", [
    style({
      opacity: 1,
    }),
    animate("150ms ease-in-out", style({ opacity: 0 })),
  ]),
]);
