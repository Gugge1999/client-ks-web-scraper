import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, of } from "rxjs";
import { initialApiStatus } from "@constants/constants";
import { ApiStatus } from "@models/api-status.model";
import { env } from "env/env";

@Injectable({
  providedIn: "root",
})
export class StatusService {
  private readonly http = inject(HttpClient);

  getApiStatus = () => this.http.get<ApiStatus>(`${env.apiUrl}/api-status`).pipe(catchError(() => of(initialApiStatus)));
}
