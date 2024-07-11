import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, of, retry } from "rxjs";

import { ApiStatus } from "@models/api-status.model";
import { initialApiStatus } from "@models/constants";
import { ConfigService } from "@services/app-config.service";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  private readonly http = inject(HttpClient);

  getApiStatus() {
    return this.http.get<ApiStatus>(`${ConfigService.apiUrl()}/api-status`).pipe(
      retry({ delay: 15000 }),
      catchError(() => of(initialApiStatus)),
    );
  }
}
