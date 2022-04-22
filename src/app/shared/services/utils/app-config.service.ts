import { lastValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@app/models/app-config';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  static appConfig: AppConfig;
  constructor(private http: HttpClient) {}

  async loadAppConfig() {
    try {
      AppConfigService.appConfig = await lastValueFrom(
        this.http.get<AppConfig>(
          `/assets/config/${environment.name}.config.json`
        )
      );
    } catch {
      console.error('loadAppConfig failed.');
    }
  }
}
