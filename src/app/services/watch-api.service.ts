import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "@environments/environment";

import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { retry } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}`;

  toggleActiveStatus(dto: Pick<Watch, "active" | "id" | "label">) {
    return this.http.put<Watch>(`${this.apiUrl}/toggle-active-status`, dto);
  }

  deleteWatchById(id: string) {
    return this.http.delete<{ deleteWatchId: string } | ApiError>(`${this.apiUrl}/delete-watch/${id}`);
  }

  saveNewWatch(watchFormDTO: NewWatchFormDTO) {
    return this.http.post<Watch | ApiError>(`${this.apiUrl}/save-watch`, watchFormDTO);
  }

  getAllWatches() {
    return this.http.get<Watch[]>(`${this.apiUrl}/all-watches`).pipe(retry({ delay: 15000 }));
  }
}
