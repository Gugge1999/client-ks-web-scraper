import { ApiStatus } from "@models/api-status.model";
import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { env } from "@env/env";
import { catchError, from, retry } from "rxjs";
import { ERROR_API_STATUS } from "@constants/constants";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  getApiStatus() {
    return webSocket<ApiStatus>(`${env.apiUrlWebSocket}/status`).pipe(
      retry({ count: 3, delay: 2000 }),
      catchError(() => from([ERROR_API_STATUS])),
    );
  }
}
