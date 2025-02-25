import { ApiStatus, apiStatusSchema } from "@models/api-status.model";
import { Injectable, resource, signal } from "@angular/core";
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

  getApiStatus(): Observable<ApiStatus> {
    return webSocket<ApiStatus>(`${env.apiUrlWebSocket}/status`).pipe(
      tap(res => {
        verifyResponse(apiStatusSchema, res);
      }),
      retry({ count: 3, delay: 2_000 }),
      catchError(() => from([this.ERROR_API_STATUS])),
    );
  }

  /** Guide finns:
    https://www.angulararchitects.io/en/blog/streaming-resources-for-a-chat-with-web-sockets-messages-in-a-glitch-free-world/
    Tillhörande kod finns här: C:\Code\angular_projects\streaming-resource-demo

    och: https://www.youtube.com/watch?v=FXEGxcuGbnI&list=WL&index=18

    Det verkar också komma stream till rxResource i 19.2: https://github.com/angular/angular/pull/59910
    Detta kommer gör det enklare med retry, error och verifyResponse
  */
  getApiStatusStream = resource<ApiStatus, null>({
    stream: () => {
      return new Promise(resolve => {
        const socket = new WebSocket(`${env.apiUrlWebSocket}/status`);
        const statusSignal = signal({ value: INITIAL_API_STATUS });

        socket.onmessage = event => {
          const newStatus = JSON.parse(event.data) as ApiStatus;
          verifyResponse(apiStatusSchema, newStatus);

          statusSignal.set({ value: newStatus });

          resolve(statusSignal);
        };

        socket.onerror = () => {
          statusSignal.set({ value: this.ERROR_API_STATUS });
          resolve(statusSignal);
        };
      });
    },

    defaultValue: INITIAL_API_STATUS,
  });
}
