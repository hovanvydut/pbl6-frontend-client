import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { WebSocketService } from '@app/core/services/web-socket.service';
import { AccountModel } from '@app/modules/auth/models/auth.model';
import { NotificationModel } from '@app/shared/models/notification.model';
import { NotifyService } from '@app/shared/services/notify.service';
import { ENDPOINTS } from '@app/shared/utilities';
import { Subscription } from 'rxjs';
import { menuItems } from '../../const/menu.const';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  menuItems = menuItems;
  accountInfo: AccountModel;
  ENDPOINTS = ENDPOINTS;

  isNotificationVisible: boolean = false;
  hasNewNotification: boolean = false;

  private _subscriptions: Subscription = new Subscription();

  constructor(
    private baseService: BaseService,
    private webSocketService: WebSocketService,
    private notifyService: NotifyService,
    private notificationService: NotificationService
  ) {
    this.accountInfo = this.baseService.currentUser;
  }

  ngOnInit() {
    // this._subscribeNotificationBroadCastEvent();
    if (this.baseService.isLoggedIn) {
      this.getTotalNotification();
    }
  }

  getTotalNotification() {
    this.notificationService.getTotalNotification().subscribe(res => {
      this.hasNewNotification = res?.allTime > 0;
    });
  }

  toggleNotification() {
    this.isNotificationVisible = !this.isNotificationVisible;
    if (this.isNotificationVisible === true) {
      this.hasNewNotification = false;
    }
  }

  private _subscribeNotificationBroadCastEvent() {
    this._subscriptions.add(
      this.webSocketService
        .subscribeNotification()
        .subscribe((notification: NotificationModel) => {
          this.hasNewNotification = true;
          const message =
            notification?.data?.authorInfo?.displayName +
            ' ' +
            notification?.content;
          this.notifyService.showToast(message, 3000);
        })
    );
  }
}
