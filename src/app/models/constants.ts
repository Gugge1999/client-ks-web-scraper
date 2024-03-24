import { ApiStatus } from "@models/api-status.model";

export const enum Theme {
  dark = "dark",
  light = "light",
  userTheme = "userTheme",
}

export const initialApiStatus: ApiStatus = {
  active: false,
  scrapingIntervalInMinutes: 0,
  uptime: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
};
