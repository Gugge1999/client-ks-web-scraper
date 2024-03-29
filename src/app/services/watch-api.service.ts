import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { ValidationError } from "@models/DTOs/validation-error.dto";
import { Watch } from "@models/watch.model";
import { AppConfigService } from "@services/app-config.service";
import { retry, tap } from "rxjs";
import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
  ) {}

  toggleActiveStatus(watch: Watch) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/toggle-active-status`;
    const data = { isActive: watch.active, label: watch.label, id: watch.id };

    return this.httpClient
      .put<Watch>(API_URL, data)
      .pipe(tap({ next: (res) => this.snackbarService.infoSnackbar(`Toggled status on: ${res.label}`) }));
  }

  deleteWatchById(id: string) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/delete-watch/${id}`;

    return this.httpClient.delete(API_URL);
  }

  saveNewWatch(watchFormDTO: NewWatchFormDTO) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/save-watch`;

    return this.httpClient.post<Watch | ValidationError>(API_URL, watchFormDTO);
  }

  getAllWatchesApi() {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/all-watches`;

    return this.httpClient.get<Watch[]>(API_URL).pipe(retry({ delay: 5_000 }));
  }
}
