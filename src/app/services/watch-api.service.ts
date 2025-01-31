import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { env } from "@env/env";
import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch, watchSchema } from "@models/watch.model";
import { verifyResponse } from "@utils/valibot";
import { Observable, retry, tap } from "rxjs";
import { array, object, string, uuid, pipe as valibotPipe } from "valibot";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  private readonly http = inject(HttpClient);

  private readonly bevakningarUrl = `${env.apiUrl}/bevakningar`;

  // TODO: Ändra i backend så att den returnerar en hel watchSchema
  toggleActiveStatus(dto: Pick<Watch, "active" | "id" | "label">) {
    return this.http.put<Watch | ApiError>(`${this.bevakningarUrl}/toggle-active-status`, dto).pipe(
      tap(res => {
        verifyResponse(watchSchema, res);
      }),
    );
  }

  deleteWatchById(id: string) {
    return this.http.delete<{ deleteWatchId: string } | ApiError>(`${this.bevakningarUrl}/delete-watch/${id}`).pipe(
      tap(res => {
        verifyResponse(object({ deleteWatchId: valibotPipe(string(), uuid()) }), res);
      }),
    );
  }

  saveNewWatch(newWatchFormDTO: NewWatchDTO) {
    return this.http.post<Watch | ApiError>(`${this.bevakningarUrl}/save-watch`, newWatchFormDTO).pipe(
      tap(res => {
        verifyResponse(watchSchema, res);
      }),
    );
  }

  getAllWatches(): Observable<Watch[]> {
    return this.http.get<Watch[]>(`${this.bevakningarUrl}/all-watches`).pipe(
      tap(res => {
        verifyResponse(array(watchSchema), res);
      }),
      retry({ count: 3, delay: 2000 }),
    );
  }

  toggleAll(activateAll: boolean, ids: string[]) {
    // TODO: Byt till något bättre än object. Kanske tom body
    return this.http.patch<object | ApiError>(`${this.bevakningarUrl}/toggle-all`, { activateAll, ids });
  }
}
