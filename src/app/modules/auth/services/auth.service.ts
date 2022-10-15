import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private baseService: BaseService) { }

  login(data: any): Observable<any> {
    return this.baseService.post<any>('Auth/Login', data);
  }

  register(data: any): Observable<any> {
    return this.baseService.post<any>('Auth/Register', data);
  }

}
