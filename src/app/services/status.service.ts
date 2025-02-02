import { ApiStatus, apiStatusSchema } from "@models/api-status.model";
import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { env } from "@env/env";
import { catchError, from, Observable, retry, tap } from "rxjs";
import { ERROR_API_STATUS } from "@constants/constants";
import { verifyResponse } from "@utils/valibot";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  // TODO: Byt till streaming resource. Guide finns: https://www.angulararchitects.io/en/blog/streaming-resources-for-a-chat-with-web-sockets-messages-in-a-glitch-free-world/
  getApiStatus(): Observable<ApiStatus> {
    return webSocket<ApiStatus>(`${env.apiUrlWebSocket}/status`).pipe(
      tap(res => {
        verifyResponse(apiStatusSchema, res);
      }),
      retry({ count: 3, delay: 2000 }),
      catchError(() => from([ERROR_API_STATUS])),
    );
  }
}
