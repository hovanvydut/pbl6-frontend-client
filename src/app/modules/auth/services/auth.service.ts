import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';
import { BaseModel } from '@app/shared/models/base.model';
import { AccountModel, RecoverPasswordModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private baseService: BaseService) {}

  login(data: any):  Observable<AccountModel> {
    return this.baseService.postForm<AccountModel>('auth/login', data);
  }

  register(data: any): Observable<any> {
    return this.baseService.post<any>('auth/register', data);
  }

  forgotPassword(email: string):  Observable<any> {
    const data = encodeURIComponent(email);
    console.log(data)
    return this.baseService.get<any>(`auth/forgot-password?email=${data}`);
  }

  recoverPassword(data: RecoverPasswordModel): Observable<any> {
    return this.baseService.put<any>(`auth/recover-password`, data);
  }

  logout() {
    this.baseService.removeLoggedUser();
  }
}
