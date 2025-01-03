import { inject, Injectable } from "@angular/core";
import { NewUserDto } from "@models/DTOs/user";
import { HttpClient } from "@angular/common/http";
import { ApiError } from "@models/DTOs/api-error.dto";
import { User } from "@models/user";
import { env } from "@env/env";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly jwtTokenConst = "jwt-token";
  private readonly userBaseUrl = `${env.apiUrl}/user`;

  registerNewUser(newUserDto: NewUserDto) {
    return this.http.post<User | ApiError>(`${this.userBaseUrl}/register`, newUserDto).pipe(
      tap(res => {
        if ("jwtToken" in res) {
          this.setAuthToken(res.jwtToken);
        }
      }),
    );
  }

  getAuthToken(): string {
    return localStorage.getItem(this.jwtTokenConst) ?? "";
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.jwtTokenConst, token);
  }
}
