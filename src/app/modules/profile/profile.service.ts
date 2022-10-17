import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  getProfileGeneralInfo(): Observable<any>{
    // return this.baseService.get<any>('user/profile/general-info');
    return of( {
      "id": 1,
      "email": "admin@localhost",
      "fullname": "Administrator",
      "avatar": "https://picsum.photos/200/300",
      "totalPosts": 100,
      "reputation": 10,
      "totalReviews": 1
    })
  }

  updateProfileInfo(data: any): Observable<any>{
    return this.baseService.put<any>('user/profile', data);
  }

  changePassword(data: any): Observable<any>{
    return this.baseService.put<any>('user/profile/change-password', data);
  }
}
