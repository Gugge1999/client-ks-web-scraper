import { HttpClient } from "@angular/common/http";
import { inject, Injectable, ResourceRef } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { env } from "@env/env";
import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch, watchSchema } from "@models/watch.model";
import { verifyResponse } from "@utils/valibot";
import { retry, tap } from "rxjs";
import { array, object, pipe as valibotPipe, string, uuid } from "valibot";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  private readonly httpClient = inject(HttpClient);

  private readonly bevakningarUrl = `${env.apiUrl}/bevakningar` as const;

  toggleActiveStatus(dto: { ids: string[]; newActiveStatus: boolean }) {
    return this.httpClient.put<Watch | ApiError>(`${this.bevakningarUrl}/toggle-active-statuses`, dto).pipe(
      tap(res => {
        verifyResponse(object({}), res);
        retry({ count: 3, delay: 2_000 });
      }),
    );
  }

  deleteWatchById(id: string) {
    return this.httpClient.delete<{ deleteWatchId: string } | ApiError>(`${this.bevakningarUrl}/delete-watch/${id}`).pipe(
      tap(res => {
        verifyResponse(object({ deleteWatchId: valibotPipe(string(), uuid()) }), res);
      }),
    );
  }

  saveNewWatch(newWatchFormDTO: NewWatchDTO) {
    return this.httpClient.post<Watch | ApiError>(`${this.bevakningarUrl}/save-watch`, newWatchFormDTO).pipe(
      tap(res => {
        verifyResponse(watchSchema, res);
      }),
    );
  }

  // TODO: Ska den vara en httpResource? Hur fungerar retry i en sån?
  // TODO: Det går att lägga till retry i interceptor. Är det en bra idé?
  getAllWatches(): ResourceRef<Watch[]> {
    return rxResource({
      stream: () =>
        this.httpClient.get<Watch[]>(`${this.bevakningarUrl}/all-watches`).pipe(
          tap(res => {
            verifyResponse(array(watchSchema), res);
          }),
          retry({ count: 3, delay: 2_000 }),
        ),

      defaultValue: [],
    });
  }
}
