import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { UserService } from "@services/user.service";

export const jwtTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(UserService).getAuthToken();

  const newReq = req.clone({
    headers: req.headers.append("X-Authentication-Token", authToken),
  });

  return next(newReq);
};
