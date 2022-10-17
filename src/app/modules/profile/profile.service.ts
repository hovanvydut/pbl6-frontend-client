import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//
import { BaseService } from '@app/core/services/base.service';
import { ProfileBaseModel, ProfileModel } from './models/profile.model';
import { BaseModel } from './../../shared/models/base.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private baseService: BaseService) { }

  getProfileInfo(): Observable<BaseModel<ProfileModel>>{
    return this.baseService.get<BaseModel<ProfileModel>>('user/personal?userId=1');
  }

  getProfileGeneralInfo(): Observable<BaseModel<ProfileBaseModel>>{
    return this.baseService.get<BaseModel<ProfileBaseModel>>('user/personal?userId=1');
  }

  updateProfileInfo(data: any): Observable<any>{
    return this.baseService.put<any>('user/profile', data);
  }

  changePassword(data: any): Observable<any>{
    return this.baseService.put<any>('user/profile/change-password', data);
  }
}
