import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiError } from "@models/DTOs/api-error.dto";
import { User } from "@models/user";
import { env } from "@env/env";
import { ChangePasswordDto, ResetPasswordDto, UserFormDto } from "@models/DTOs/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly jwtTokenConst = "jwt-token";
  private readonly userBaseUrl = `${env.apiUrl}/user` as const;

  // TODO: Kolla på https://www.youtube.com/watch?v=586O934xrhQ
  registerNewUser(newUserDto: UserFormDto) {
    return this.httpClient.post<User | ApiError>(`${this.userBaseUrl}/register`, newUserDto);

    // .pipe(
    //     tap(res => {
    //       if ("jwtToken" in res) {
    //         this.setAuthToken(res.jwtToken);
    //       }
    //     }),
    //   );
  }

  changePassword(changePasswordDto: ChangePasswordDto) {
    return this.httpClient.post<User | ApiError>(`${this.userBaseUrl}/register`, changePasswordDto);
  }

  resetPassword(email: ResetPasswordDto) {
    return this.httpClient.post<User | ApiError>(`${this.userBaseUrl}/reset-password`, email);
  }

  login(newUserDto: UserFormDto) {
    return this.httpClient.post<User | ApiError>(`${this.userBaseUrl}/login`, newUserDto);
  }

  logout() {
    // TODO: Ska den vara post?
    return this.httpClient.post<User | ApiError>(`${this.userBaseUrl}/logout`, {});
  }

  getAuthToken(): string {
    return localStorage.getItem(this.jwtTokenConst) ?? "";
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.jwtTokenConst, token);
  }

  deleteUser(id: string) {
    return this.httpClient.delete<User | ApiError>(`${this.userBaseUrl}/delete/${id}`);
  }
}
