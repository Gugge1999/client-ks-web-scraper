import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";

import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { ValidationError } from "@models/DTOs/validation-error.dto";
import { Watch } from "@models/watch.model";
import { AppConfigService } from "@services/app-config.service";
import { retry } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
  newWatchLoading = signal(false);

  private url: string = "https://type.fit/api/quotes";

  getData() {
    return fetch(this.url)
      .then((res) => res.json())
      .then((res: Watch) => {
        res.added;
        // res is now an Actor
      });
  }

  // TODO: Byt till fetch? Enklare att jobba med tillsammans med signals
  constructor(private httpClient: HttpClient) {}

  toggleActiveStatus(watch: Watch) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/toggle-active-status`;
    const data = { isActive: watch.active, label: watch.label, id: watch.id };

    return this.httpClient.put<Pick<Watch, "id" | "active" | "label">>(API_URL, data);
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

    return this.httpClient.get<Watch[]>(API_URL).pipe(retry({ count: 2, delay: 5_000 }));
  }
}
