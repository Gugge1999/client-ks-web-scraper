import { HttpHeaders } from "@angular/common/http";
import { ApiStatus } from "@models/api-status.model";

export type Theme = "dark" | "light";

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

export const httpHeadersNoCache: Readonly<{ headers: HttpHeaders }> = {
  headers: new HttpHeaders({
    "Cache-Control": "no-cache",
  }),
};

export const errorMessageConst = "errorMessage";
export const verboseErrorMessageConst = "verboseErrorMessage";
