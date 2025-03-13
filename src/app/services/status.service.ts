import { ApiStatus, apiStatusSchema } from "@models/api-status.model";
import { Injectable } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { env } from "@env/env";
import { catchError, from, Observable, retry, tap } from "rxjs";
import { verifyResponse } from "@utils/valibot";
import { INITIAL_API_STATUS } from "@constants/constants";
import { rxResource } from "@angular/core/rxjs-interop";

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

  // swPersonResource = httpResource<StarWarsPerson>(() => "https://swapi.dev/api/people/", {
  //   parse: data => parse(starWarsPersonSchema, data),
  // });

  // readonly swPersonResourceNy = httpResource<StarWarsPerson[]>(() => ({
  //   url: `/users`,
  //   params: { sort: this.sortOrder() },
  // }));

  // readonly sortOrder = signal<"asc" | "desc">("asc");

  /** Guide finns:
    https://www.angulararchitects.io/en/blog/streaming-resources-for-a-chat-with-web-sockets-messages-in-a-glitch-free-world/
    Tillhörande kod finns här: `C:\Code\angular_projects\streaming-resource-demo`

    och: https://www.youtube.com/watch?v=FXEGxcuGbnI&list=WL&index=18

    Det verkar också komma stream till rxResource i 19.2: https://github.com/angular/angular/pull/59910
    Detta kommer gör det enklare med retry, error och verifyResponse
  */
  getApiStatusStream = rxResource<ApiStatus, null>({
    loader: () => {
      return webSocket<ApiStatus>(`${env.apiUrlWebSocket}/status`).pipe(
        tap(res => {
          verifyResponse(apiStatusSchema, res);
        }),
        retry({ count: 3, delay: 2_000 }),
        catchError(() => from([this.ERROR_API_STATUS])),
      );
    },

    defaultValue: INITIAL_API_STATUS,
  });
}

// const starWarsPersonSchema = object({
//   name: string(),
//   height: string(),
//   mass: string(),
//   films: array(string()),
//   created: string(),
// });

// // OBS! Låt det vara ett interface. Om det är "type" kommer alla props att expanderas vid hover istället för att visa "Watch"
// export interface StarWarsPerson extends InferOutput<typeof starWarsPersonSchema> {}
