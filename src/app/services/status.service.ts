import { ApiStatus } from "@models/api-status.model";
import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { env } from "env/env";
import { asyncScheduler, catchError, retry, scheduled } from "rxjs";
import { ERROR_API_STATUS } from "@constants/constants";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  getApiStatus() {
    return webSocket<ApiStatus>(`${env.apiUrlWebSocket}/api-status`).pipe(
      retry({ count: 5, delay: 5000 }),
      catchError(() => scheduled([ERROR_API_STATUS], asyncScheduler)),
    );
  }
}
