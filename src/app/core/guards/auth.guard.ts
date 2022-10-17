import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _baseService: BaseService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this._baseService.isLoggedIn) {
      return true;
    }
    //
    this._router
      .navigate(['/auth/login'], { queryParams: { returnUrl: state.url } })
      .then();
    return false;
  }
}
