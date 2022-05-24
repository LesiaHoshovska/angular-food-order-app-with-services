import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              router: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  return this.authService.user.pipe(take(1), map(user=>{
    const isAuth = !!user;
    if(isAuth){
      return true
    }
      return this.router.createUrlTree(['/auth'])
    }))
  }
}
