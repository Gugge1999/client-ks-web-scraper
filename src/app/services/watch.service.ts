import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WatchFormDTO } from '@app/models/DTOs/watch-form-dto';
import { ProgressBarOverlayService } from '@app/shared/services/progress-bar/progess-bar-overlay.service';
import { Watch } from '@models/watch.model';
import { AppConfigService } from '@shared/services/utils/app-config.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class WatchService {
  constructor(
    private http: HttpClient,
    private progressBarService: ProgressBarOverlayService
  ) {}

  addNewWatch(watchFormDTO: WatchFormDTO): Observable<Watch> {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/add-watch`;

    this.progressBarService.show('Adding watch...');

    return this.http.post<Watch>(API_URL, watchFormDTO, httpOptions);
  }

  getAllWatches(): Observable<Watch[]> {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/all-watches`;

    return this.http.get<Watch[]>(API_URL, httpOptions);
  }

  toggleActiveStatus(watch: {
    isActive: boolean;
    label: string;
    id: string;
  }): Observable<{ isActive: boolean; label: string }> {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/toggle-active-status`;
    const data = { isActive: watch.isActive, label: watch.label, id: watch.id };

    return this.http.put<{ isActive: boolean; label: string }>(
      API_URL,
      data,
      httpOptions
    );
  }

  deleteWatch(id: string): Observable<{ deletedWatchId: string }> {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/delete-watch/${id}`;

    return this.http.delete<{ deletedWatchId: string }>(API_URL, httpOptions);
  }
}
