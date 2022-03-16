import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {AuthService} from "../service/auth/auth.service";
import {Observable} from "rxjs";
import {TokenService} from "../service/auth/token.service";
import {Role} from "../models/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  roles!: string[];

  constructor(private auth: AuthService, private rout: Router, private tokenService: TokenService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url;

    this.roles = this.tokenService.getRole();
    console.log("this.roles")
    console.log(this.roles)
    if (this.roles == null) {
      return false;
    }
    for (const routeElement of this.roles) {
      if (routeElement == "ROLE_USER") {
        return true;
      }
      if (routeElement == "ROLE_ADMIN") {
        url = '/admin'
        break;
      }
    }
    return this.rout.navigate([url]);
  }
}

