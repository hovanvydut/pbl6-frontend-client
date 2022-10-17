import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private baseService: BaseService) {}

  login(data: any): Observable<any> {
    // return this.baseService.post<any>('Auth/Login', data);
    return of(true);
  }

  register(data: any): Observable<any> {
    // return this.baseService.post<any>('Auth/Register', data);
    return of(true);
  }
}
