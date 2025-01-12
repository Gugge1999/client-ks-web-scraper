import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { env } from "@env/env";
import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { verifyResponseNy, Watch, watchSchemaNy } from "@models/watch.model";
import { retry } from "rxjs";
import * as v from "valibot";

// TODO: Den här klassen borde bara nås via watch service.
@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  private readonly http = inject(HttpClient);

  private readonly bevakningarUrl = `${env.apiUrl}/bevakningar`;

  toggleActiveStatus(dto: Pick<Watch, "active" | "id" | "label">) {
    return this.http.put<Watch | ApiError>(`${this.bevakningarUrl}/toggle-active-status`, dto, { withCredentials: true });
  }

  deleteWatchById(id: string) {
    return this.http.delete<{ deleteWatchId: string } | ApiError>(`${this.bevakningarUrl}/delete-watch/${id}`);
  }

  saveNewWatch(watchFormDTO: NewWatchFormDTO) {
    return this.http.post<Watch | ApiError>(`${this.bevakningarUrl}/save-watch`, watchFormDTO);
  }

  getAllWatches() {
    return this.http
      .get<Watch[]>(`${this.bevakningarUrl}/all-watches`)
      .pipe(verifyResponseNy(v.array(watchSchemaNy)), retry({ count: 3, delay: 2000 }));
  }

  toggleAll(activateAll: boolean, ids: string[]) {
    return this.http.patch<Watch[] | ApiError>(`${this.bevakningarUrl}/toggle-all`, { activateAll, ids });
  }
}
