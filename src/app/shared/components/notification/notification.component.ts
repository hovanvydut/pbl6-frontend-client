import { ENDPOINTS } from '@app/shared/utilities';
import { Component, Input, OnInit } from '@angular/core';
import { QueryParams } from '@app/modules/post/models/post.model';
import { TabItemModel } from '@app/shared/models/base.model';
import { NotificationService } from '@app/shared/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() isTabVisible: boolean = false;
  notifications = [];
  tabs = [
    new TabItemModel({
      name: 'Hôm nay',
      id: 'today',
      total: 12,
    }),
    new TabItemModel({
      name: 'Tất cả',
      id: 'all'
    })
  ];
  selectedTab = this.tabs[0];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 0,
    pageSize: 10
  });
  ENDPOINTS = ENDPOINTS;


  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(
      res => {
        this.notifications = res;
      }
    )
  }

  maskReadAllNotitications() {
    
  }

  onTabClick(tab: any) {
    this.selectedTab = tab;
    switch( this.selectedTab.id ) {
      case 'today':
        break;
      case 'all':
        break;
      default:
        break;
    }
    // get notification
  }

}
