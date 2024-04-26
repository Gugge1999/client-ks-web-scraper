import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { AppConfigService } from "@services/app-config.service";
import { retry } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  private readonly http = inject(HttpClient);

  private readonly baseApiUrl = `${AppConfigService.baseApiUrl()}`;

  toggleActiveStatus = (dto: Pick<Watch, "active" | "label" | "id">) => this.http.put<Watch>(`${this.baseApiUrl}/toggle-active-status`, dto);

  deleteWatchById = (id: string) => this.http.delete<{ deleteWatchId: string } | ApiError>(`${this.baseApiUrl}/delete-watch/${id} `);

  saveNewWatch = (watchFormDTO: NewWatchFormDTO) => this.http.post<Watch | ApiError>(`${this.baseApiUrl}/save-watch`, watchFormDTO);

  getAllWatchesApi = () => this.http.get<Watch[]>(`${this.baseApiUrl}/all-watches`).pipe(retry({ delay: 5_000 }));
}
