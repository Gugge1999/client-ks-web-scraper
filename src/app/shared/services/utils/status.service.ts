import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiStatus } from '@models/api-status.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class StatusService {
  REST_API: string = 'http://192.168.1.2:3000';

  constructor(private http: HttpClient) {}

  getApiStatus(): Observable<ApiStatus> {
    const API_URL = `${this.REST_API}/api-status`;

    return this.http.get<ApiStatus>(API_URL, httpOptions);
  }
}
