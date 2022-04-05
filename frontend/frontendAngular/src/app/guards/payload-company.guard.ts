import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageLoginService } from '../services/local-storage-login.service';

@Injectable({
  providedIn: 'root'
})
export class PayloadCompanyGuard implements CanActivate {
  constructor(
    public localStorage: LocalStorageLoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorage.decodePayloadJWT(this.localStorage.get("token")).cnpj != null) {
      return true;
    } else {
      this.router.navigateByUrl('/user/home');
      return false;
    }
  }

}
