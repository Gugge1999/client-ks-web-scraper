import { HttpHeaders } from "@angular/common/http";
import { ApiStatus } from "@models/api-status.model";

export const enum Theme {
  dark = "dark",
  light = "light",
  userTheme = "user-theme",
}

export const initialApiStatus: ApiStatus = Object.freeze({
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
});

export const httpOptions = Object.freeze({
  headers: new HttpHeaders({
    "Cache-Control": "no-cache",
  }),
});

export const errorMessageConst = "errorMessage";
export const verboseErrorMessageConst = "verboseErrorMessage";
