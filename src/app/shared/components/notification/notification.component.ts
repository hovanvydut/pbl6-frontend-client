import { NotificationContent, NotificationCode, NotificationTypeIcon, NotificationTypeColor } from './../../app.enum';
import {
  NotificationBaseModel,
  NotificationFilterParams
} from './../../models/notification.model';
import { ENDPOINTS } from '@app/shared/utilities';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { QueryParams } from '@app/modules/post/models/post.model';
import { NotificationService } from '@app/shared/services/notification.service';
import { Router } from '@angular/router';
import { NOTIFICATION_TABS } from '@app/shared/app.constants';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() isTabVisible: boolean = true;
  @Input() showNavigate: boolean = false;
  notifications = [];
  tabs = NOTIFICATION_TABS;
  selectedTab = this.tabs[0];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10
  });
  totalNotifications: number;
  ENDPOINTS = ENDPOINTS;
  NotificationContent = NotificationContent;
  NotificationTypeIcon = NotificationTypeIcon;
  NotificationTypeColor = NotificationTypeColor;
  NotificationCode = NotificationCode;
  notificationFilterParams: NotificationFilterParams = new NotificationFilterParams(
    {
      pageNumber: 1,
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
          notification.content = this.generateNotificationContent(notification);
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
    // this.getNotifications();
  }

  markReadNotification(id: number) {
    this.notificationService.markReadNotification(id).subscribe(res => {
      const notification = this.notifications.find(item => item.id === id);
      if (notification) {
        notification.hasRead = true;
      }
    });
    // this.getNotifications();
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

  generateNotificationContent(notification: NotificationBaseModel) {
    let content = '';
    switch (notification.code) {
      case NotificationCode.BOOKING__HAS_BOOKING_ON_POST:
        content = ` <b class="text-12 font-bold">  ${notification?.originUserName} </b> đặt phòng <b> ${notification?.postTitle} </b>`;
        break;
      case NotificationCode.REVIEW__HAS_REVIEW_ON_POST:
        content = `<b class="text-12 font-bold"> ${notification?.originUserName} </b> đánh giá: ${notification.reviewContent} về bài viết <b> ${notification?.postTitle}</b>`;
        break;
      case NotificationCode.BOOKING__HOST_CONFIRM_MET:
        content = `<b class="text-12 font-bold"> ${notification?.originUserName} </b> đã xác nhận đã gặp nhau với bạn`;
        break;
      case NotificationCode.BOOKING__HOST_APPROVE_MEETING:
        content = `<b class="text-12 font-bold"> ${notification?.originUserName} </b> đã chấp nhận lịch hẹn của bạn`;
        break;
      default:
        break;
    }
    return content;
  }
}
