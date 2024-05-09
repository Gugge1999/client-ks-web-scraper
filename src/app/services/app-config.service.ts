import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { lastValueFrom } from "rxjs";

import { environment } from "@environments/environment";
import { AppConfig } from "@models/app-config";
import { httpOptions } from "@models/constants";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private static appConfig: AppConfig;

  private readonly http = inject(HttpClient);

  async loadAppConfig() {
    try {
      ConfigService.appConfig = await lastValueFrom(this.http.get<AppConfig>(`/assets/config/${environment.name}.config.json`, httpOptions));
    } catch (err) {
      console.error("loadAppConfig failed.", err);
    }
  }

  static apiUrl = () => ConfigService.appConfig.apiBaseUrl;
}
