import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

import { environment } from "@environments/environment";
import { AppConfig } from "@models/app-config";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  public static appConfig: AppConfig;

  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Cache-Control": "no-cache",
    }),
  };

  constructor(private http: HttpClient) {}

  async loadAppConfig() {
    try {
      AppConfigService.appConfig = await lastValueFrom(this.http.get<AppConfig>(`/assets/config/${environment.name}.config.json`, this.httpOptions));
    } catch (err) {
      console.error("loadAppConfig failed.", err);
    }
  }
}
