import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewWatchFormDTO } from '@models/DTOs/new-watch-form-dto';
import { Watch } from '@models/watch.model';
import { AppConfigService } from '@shared/services/utils/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  constructor(private httpClient: HttpClient) {}

  addNewWatch(watchFormDTO: NewWatchFormDTO) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/add-watch`;

    return this.httpClient.post<Watch>(API_URL, watchFormDTO);
  }

  getAllWatches() {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/all-watches`;

    return this.httpClient.get<Watch[]>(API_URL);
  }

  toggleActiveStatus(watch: Watch) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/toggle-active-status`;
    const data = { isActive: watch.active, label: watch.label, id: watch.id };

    return this.httpClient.put<{
      id: string;
      active: boolean;
      label: string;
    }>(API_URL, data);
  }

  deleteWatchById(id: string) {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/delete-watch/${id}`;

    return this.httpClient.delete<{ deletedWatchId: string }>(API_URL);
  }
}
