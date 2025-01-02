import { inject, Injectable } from "@angular/core";
import { NewUserDto } from "@models/DTOs/user";
import { HttpClient } from "@angular/common/http";
import { ApiError } from "@models/DTOs/api-error.dto";
import { User } from "@models/User";
// TODO: Skapa path alias och uppdatera alla referenser
import { env } from "../../env/env";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly userBaseUrl = `${env.apiUrl}/user`;

  registerNewUser(newUserDto: NewUserDto) {
    return this.http.post<User | ApiError>(`${this.userBaseUrl}/register`, newUserDto);
  }
}
