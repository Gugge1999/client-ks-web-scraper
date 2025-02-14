import { ApiStatus, apiStatusSchema } from "@models/api-status.model";
import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { env } from "@env/env";
import { catchError, from, Observable, retry, tap } from "rxjs";
import { verifyResponse } from "@utils/valibot";
import { INITIAL_API_STATUS } from "@constants/constants";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  private readonly ERROR_API_STATUS: ApiStatus = {
    ...INITIAL_API_STATUS,
    status: "inactive",
  } as const;

  /* TODO: Byt till streaming resource. Den kommer i Angular 19.2

   Guide finns:
   https://www.angulararchitects.io/en/blog/streaming-resources-for-a-chat-with-web-sockets-messages-in-a-glitch-free-world/

   Tillhörande kod finns här: C:\Code\angular_projects\streaming-resource-demo */
  getApiStatus(): Observable<ApiStatus> {
    return webSocket<ApiStatus>(`${env.apiUrlWebSocket}/status`).pipe(
      tap(res => {
        verifyResponse(apiStatusSchema, res);
      }),
      retry({ count: 3, delay: 2000 }),
      catchError(() => from([this.ERROR_API_STATUS])),
    );
  }
}
