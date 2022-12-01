import { NotificationContent, NotificationCode } from './../../app.enum';
import { NotificationBaseModel } from './../../models/notification.model';
import { map } from 'rxjs';
import { ENDPOINTS } from '@app/shared/utilities';
import { Component, Input, OnInit } from '@angular/core';
import { QueryParams } from '@app/modules/post/models/post.model';
import { TabItemModel } from '@app/shared/models/base.model';
import { NotificationService } from '@app/shared/services/notification.service';
import { NotifyService } from '@app/shared/services/notify.service';

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
  totalNotifications: number;
  ENDPOINTS = ENDPOINTS;
  NotificationContent = NotificationContent;
  NotificationCode = NotificationCode;


  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(
      res => {
        this.notifications = res.records.map( item => {
          let extraData: {
            PostId: number;
            ReviewId: number;
            ReviewContent: string;
            BookingId: number;
          };
          try {
            extraData = JSON.parse(item.extraData);
          } catch (error) {
            extraData = {} as {
              PostId: number;
              ReviewId: number;
              ReviewContent: string;
              BookingId: number;
            };
          }
          const notification = new NotificationBaseModel({
            id: item.id,
            userId: item.userId,
            content: item.content,
            hasRead: item.hasRead,
            code: item.code,
            createdAt: item.createdAt,
            postId: extraData.PostId,
            reviewId: extraData.ReviewId,
            reviewContent: extraData.ReviewContent,
            bookingId: extraData.BookingId,
            originUserName: item.originUserName,
            originUserId: item.originUserId,
            originUserEmail: item.originUserEmail
          });
          return notification;
        });

        this.totalNotifications = res.totalRecords;
      }
    )
  }

  maskReadAllNotitications() {
    this.notificationService.markReadAllNotifications().subscribe(
      res => {
        this.notifications.map( item => {
          item.hasRead = true;
        })
      }
    )
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
