import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { NotificationBaseModel, NotificationModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private baseService: BaseService) {}

  getNotification(): Observable<any> {
    let data: NotificationModel[] = [];

    // generate data of notification
    for (let i = 0; i < 10; i++) {
      data.push(
        new NotificationModel({
          id: i.toString(),
          userId: i.toString(),
          content: 'đặt lịch xem trọ của bạn',
          code: 'code',
          hasRead: i > 5 ? true : false,
          data: {
            authorInfo: {
              id: i.toString(),
              displayName: 'Nguyễn Văn A',
            }
          },
          createdAt: new Date()
        })
      );
    }
    return of(data);
    // return this.baseService.get('notification');
  }
}
