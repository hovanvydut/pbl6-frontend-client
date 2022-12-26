import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Role } from '@app/shared/app.enum';
import { ENDPOINTS } from '@app/shared/utilities';
import { Observable } from 'rxjs';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class LandlordGuard implements CanActivate {
  constructor(private _router: Router, private _baseService: BaseService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentRole = this._baseService.getCurrentRole;
    if (currentRole === Role.Landlord || currentRole === Role.LandlordFinder || currentRole === Role.Admin) {
      return true;
    }
    this._router
      .navigate([ENDPOINTS.FORBIDDEN], {
        queryParams: { returnUrl: state.url }
      })
      .then();
    return false;
  }
}
