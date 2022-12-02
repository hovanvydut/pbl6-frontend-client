import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { NotificationBaseModel, NotificationFilterParams, NotificationModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private baseService: BaseService) {}

  getNotification(params: NotificationFilterParams): Observable<any> {
    const queryString =
    '?' +
    Object.keys(params)
      .map(key => {
        if (params[key] !== null) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        }
        return '';
      })
      .join('&');
    return this.baseService.get(`notification${queryString}`);
  }

  markReadAllNotifications(): Observable<any> {
    return this.baseService.put('notification/mark-all-read', null);
  }

  markReadNotifition(id: number): Observable<any> {
    return this.baseService.put(`notification/has-read/${id}`, null);
  }
}
