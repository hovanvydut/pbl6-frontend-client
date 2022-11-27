import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { NotificationBaseModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private baseService: BaseService) { }


  getNotification(): Observable<any>{
    let data: NotificationBaseModel[] = [];
    // generate data of notification 
    for(let i = 0; i < 10; i++){
      data.push(new NotificationBaseModel({
        id: i.toString(),
        userId: i.toString(),
        content: 'content',
        code: 'code',
        hasRead: false,
        createdAt: new Date(),
      }));
    }
    return of(data);
    // return this.baseService.get('notification');
  }
}
