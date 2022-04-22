import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  apiUrl!: string;

  constructor(private http: HttpClient) {}

  addNewWatch(data: { label: string; link: string }): Observable<Watch> {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/add-watch`;

    return this.http.post<Watch>(API_URL, data, httpOptions);
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
