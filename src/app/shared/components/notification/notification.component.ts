import { NotificationContent, NotificationCode } from './../../app.enum';
import {
  NotificationBaseModel,
  NotificationFilterParams
} from './../../models/notification.model';
import { ENDPOINTS } from '@app/shared/utilities';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { QueryParams } from '@app/modules/post/models/post.model';
import { TabItemModel } from '@app/shared/models/base.model';
import { NotificationService } from '@app/shared/services/notification.service';
import { Router } from '@angular/router';

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
      id: 'today'
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
  notificationFilterParams: NotificationFilterParams = new NotificationFilterParams(
    {
      pageNumber: 0,
      pageSize: 10,
      searchValue: '',
      today: true
    }
  );

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTotalNotification();
    this.getNotifications();
  }

  getTotalNotification() {
    this.notificationService.getTotalNotification().subscribe(res => {
      this.tabs[0].total = res.today;
      this.tabs[1].total = res.allTime;
    });
  }

  getNotifications() {
    this.notificationService
      .getNotification(this.notificationFilterParams)
      .subscribe(res => {
        this.notifications = res.records.map(item => {
          let extraData: {
            PostId: number;
            ReviewId: number;
            ReviewContent: string;
            BookingId: number;
            PostTitle: string;
            BookingTime: string;
          };
          try {
            extraData = JSON.parse(item.extraData);
          } catch (error) {
            extraData = {} as {
              PostId: number;
              ReviewId: number;
              ReviewContent: string;
              BookingId: number;
              PostTitle: string;
              BookingTime: string;
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
            originUserEmail: item.originUserEmail,
            originUserAvatar: item.originUserAvatar,
            postTitle: extraData.PostTitle,
            bookingTime: new Date(extraData.BookingTime)
          });
          return notification;
        });
      });
  }

  maskReadAllNotitications() {
    this.notificationService.markReadAllNotifications().subscribe(res => {
      this.notifications.map(item => {
        item.hasRead = true;
      });
    });
  }

  onTabClick(tab: any) {
    this.selectedTab = tab;
    switch (this.selectedTab.id) {
      case 'today':
        this.notificationFilterParams.today = true;
        break;
      case 'all':
        this.notificationFilterParams.today = false;
        break;
      default:
        break;
    }
    this.getNotifications();
  }

  onNotificationClick(notification: NotificationBaseModel) {
    switch (notification.code) {
      case NotificationCode.BOOKING__HAS_BOOKING_ON_POST:
        this.router.navigate([ENDPOINTS.USER_BOOKING_CALENDAR], {
          queryParams: { bookingId: notification.bookingId }
        });
        break;

      case NotificationCode.REVIEW__HAS_REVIEW_ON_POST:
        const url = ENDPOINTS.POST_DETAIL + '/' + notification.postId;
        this.router.navigate([url], {
          queryParams: { reviewId: notification.reviewId }
        });
        break;
      default:
        break;
    }
  }
}
