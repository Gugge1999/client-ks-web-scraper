import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, of, retry } from "rxjs";

import { initialApiStatus } from "@constants/constants";
import { environment } from "@environments/environment";
import { ApiStatus } from "@models/api-status.model";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  private readonly http = inject(HttpClient);

  getApiStatus() {
    return this.http.get<ApiStatus>(`${environment.apiUrl}/api-status`).pipe(
      retry({ delay: 15_000 }),
      catchError(() => of(initialApiStatus)),
    );
  }
}
