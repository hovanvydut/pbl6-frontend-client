import { PermissionType } from '@app/shared/app.enum';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';
import { Observable } from 'rxjs';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private _router: Router, private _baseService: BaseService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const hasPermission = this._baseService.permission?.includes(
      PermissionType.PostCreate
    );
    if (hasPermission) {
      this._router
        .navigate([ENDPOINTS.DASHBOARD], {
          queryParams: { returnUrl: state.url }
        })
        .then();
      return false;
    } else {
      return true;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const hasPermission = this._baseService.permission?.includes(
      PermissionType.PostCreate
    );
    if (hasPermission) {
      this._router
        .navigate([ENDPOINTS.DASHBOARD], {
          queryParams: { returnUrl: state.url }
        })
        .then();
      return false;
    } else {
      return true;
    }
  }
}
