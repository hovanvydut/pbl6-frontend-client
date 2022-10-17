import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private baseService: BaseService) { }

  getProfileInfo(): Observable<any>{
    return this.baseService.get<any>('user/profile');
  }

  updateProfileInfo(data: any): Observable<any>{
    return this.baseService.put<any>('user/profile', data);
  }

  changePassword(data: any): Observable<any>{
    return this.baseService.put<any>('user/profile/change-password', data);
  }
}
