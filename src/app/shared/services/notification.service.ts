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
    return this.baseService.get('notification');
  }

  markReadAllNotifications(): Observable<any> {
    return this.baseService.put('notification/mark-all-read', null);
  }

  markReadNotifition(id: number): Observable<any> {
    return this.baseService.put(`notification/has-read/${id}`, null);
  }
}
