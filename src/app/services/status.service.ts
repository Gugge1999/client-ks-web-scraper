import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

import { ApiStatus } from "@models/api-status.model";
import { initialApiStatus } from "@models/constants";
import { AppConfigService } from "@services/app-config.service";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  constructor(private http: HttpClient) {}

  getApiStatus(): Observable<ApiStatus> {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/api-status`;

    return this.http.get<ApiStatus>(API_URL).pipe(catchError(() => of(initialApiStatus)));
  }
}