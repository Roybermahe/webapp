import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment";

export const httpUrlInterceptor: HttpInterceptorFn = (req, next) => {
    const request = req.clone({
      url: environment.apiUrl + req.url
    })
    return next(request);
  };