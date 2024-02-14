import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { NewWatchFormDTO } from "@models/DTOs/new-watch-form-dto";
import { Watch } from "@models/watch.model";
import { AppConfigService } from "@services/app-config.service";
import { retry } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WatchApiService {
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

  addNewWatch(watchFormDTO: NewWatchFormDTO) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/add-watch`;

    return this.httpClient.post<Watch>(API_URL, watchFormDTO);
  }

  getAllWatchesApi() {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/all-watches`;

    return this.httpClient.get<Watch[]>(API_URL).pipe(retry({ count: 2, delay: 5_000 }));
  }
}
