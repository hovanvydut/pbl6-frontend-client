import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '@app/core/services/web-socket.service';
import { NotificationModel } from '@app/shared/models/notification.model';
import { NotifyService } from '@app/shared/services/notify.service';
import { ENDPOINTS } from '@app/shared/utilities';
import { Subscription } from 'rxjs';
import { menuItems } from '../../const/menu.const';
//
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  ENDPOINTS = ENDPOINTS;
  SIDEBAR_MENU = [
    {
      name: 'Dashboard',
      items: menuItems
    }
  ];
  hasNewNotification: boolean = false;
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private webSocketService: WebSocketService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    // this._subscribeNotificationBroadCastEvent();
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

  handleItemClicked(link: string) {
    if (ENDPOINTS.NOTIFICATIONS === link) {
      this.hasNewNotification = false;
    }
  }
}
