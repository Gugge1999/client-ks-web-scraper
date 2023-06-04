import { Observable } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiStatus } from "@models/api-status.model";

import { AppConfigService } from "./app-config.service";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
    }),
  };

  getApiStatus(): Observable<ApiStatus> {
    const API_URL = `${AppConfigService.appConfig.apiBaseUrl}/api-status`;

    return this.http.get<ApiStatus>(API_URL, this.httpOptions);
  }
}
