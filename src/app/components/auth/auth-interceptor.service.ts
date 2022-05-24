import {Injectable} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(take(1), exhaustMap(user=>{
      if(!user){
        return next.handle(req)
      }
      // @ts-ignore
      const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token )})
      return next.handle(modifiedReq)
    }))
  }
}
