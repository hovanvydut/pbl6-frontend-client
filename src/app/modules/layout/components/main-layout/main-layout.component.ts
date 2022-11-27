import { Component, OnInit } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { WebSocketService } from '@app/core/services/web-socket.service';
import { AccountModel } from '@app/modules/auth/models/auth.model';
import { NotificationResponseModel } from '@app/shared/models/notification.model';
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

  private _subscriptions: Subscription = new Subscription();

  
  constructor(private baseService: BaseService, private webSocketService: WebSocketService) {
    this.accountInfo = this.baseService.currentUser;
  }

  ngOnInit() {
    this._subscribeNotificationBroadCastEvent();
  }

  toggleNotification() {
    this.isNotificationVisible = !this.isNotificationVisible;
  }

  private _subscribeNotificationBroadCastEvent() {
    this._subscriptions.add(this.webSocketService.subscribeNotification().subscribe((res: NotificationResponseModel) => {
      console.log(res);
    }));
}

}
