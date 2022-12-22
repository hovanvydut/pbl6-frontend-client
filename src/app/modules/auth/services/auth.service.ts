import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';
import { BaseModel } from '@app/shared/models/base.model';
import { AccountModel, LoginModel, RecoverPasswordModel, RegisterAccountModel, RegisterResponseModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private baseService: BaseService) {}

  login(data: LoginModel):  Observable<AccountModel> {
    return this.baseService.postForm<AccountModel>('auth/login', data);
  }

  register(data: RegisterAccountModel): Observable<RegisterResponseModel> {
    return this.baseService.post<RegisterResponseModel>('auth/register', data);
  }

  forgotPassword(email: string):  Observable<null> {
    const data = encodeURIComponent(email);
    return this.baseService.get<null>(`auth/forgot-password?email=${data}`);
  }

  recoverPassword(data: RecoverPasswordModel): Observable<null> {
    return this.baseService.put<null>(`auth/recover-password`, data);
  }

  logout() {
    this.baseService.removeLoggedUser();
  }
}
