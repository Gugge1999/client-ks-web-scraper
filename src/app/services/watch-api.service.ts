import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import { ApiError } from "@models/DTOs/api-error.dto";
import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { ConfigService } from "@services/app-config.service";
import { retry } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${ConfigService.apiUrl()}`;

  toggleActiveStatus = (dto: Pick<Watch, "active" | "id" | "label">) => this.http.put<Watch>(`${this.apiUrl}/toggle-active-status`, dto);

  deleteWatchById = (id: string) => this.http.delete<{ deleteWatchId: string } | ApiError>(`${this.apiUrl}/delete-watch/${id} `);

  saveNewWatch = (watchFormDTO: NewWatchFormDTO) => this.http.post<Watch | ApiError>(`${this.apiUrl}/save-watch`, watchFormDTO);

  getAllWatchesApi = () => this.http.get<Watch[]>(`${this.apiUrl}/all-watches`).pipe(retry({ delay: 5_000 }));
}
