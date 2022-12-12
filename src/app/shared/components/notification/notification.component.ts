import {
  NotificationContent,
  NotificationCode,
  NotificationTypeIcon,
  NotificationTypeColor
} from './../../app.enum';
import {
  NotificationBaseModel,
  NotificationFilterParams
} from './../../models/notification.model';
import { ENDPOINTS } from '@app/shared/utilities';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '@app/shared/services/notification.service';
import { Router } from '@angular/router';
import { NOTIFICATION_TABS } from '@app/shared/app.constants';
import { BOOKING_TAB_TYPE } from '@app/modules/booking-calendar/enums/booking.enum';
import { BaseService } from '@app/core/services/base.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() isTabVisible: boolean = true;
  @Input() showNavigate: boolean = false;
  @Input() pageSize: number = 5;

  ENDPOINTS = ENDPOINTS;
  NotificationContent = NotificationContent;
  NotificationTypeIcon = NotificationTypeIcon;
  NotificationTypeColor = NotificationTypeColor;
  NotificationCode = NotificationCode;
  tabs = NOTIFICATION_TABS;
  selectedTab = this.tabs[0];
  notifications = [];
  totalNotifications: number;
  notificationFilterParams: NotificationFilterParams = new NotificationFilterParams(
    {
      pageNumber: 1,
      pageSize: 5,
      searchValue: '',
      today: true
    }
  );

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private baseService: BaseService
  ) {}

  ngOnInit() {
    this.notificationFilterParams.pageSize = this.pageSize;
    if (this.baseService.isLoggedIn) {
      this.getNotifications();
    }
  }

  getTotalNotification() {
    this.notificationService.getTotalNotification().subscribe(res => {
      this.tabs[0].total = res.today;
      this.tabs[1].total = res.allTime;
    });
  }

  loadMore() {
    this.pageSize = this.pageSize + 5;
    this.notificationFilterParams.pageSize = this.pageSize;
    this.getNotifications();
  }

  getNotifications() {
    this.getTotalNotification();
    this.notificationService
      .getNotification(this.notificationFilterParams)
      .subscribe(res => {
        this.totalNotifications = res.totalRecords;
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

          const time = new Date(item.createdAt);
          time.setHours(time.getHours() + 7);

          const notification = new NotificationBaseModel({
            id: item.id,
            userId: item.userId,
            content: item.content,
            hasRead: item.hasRead,
            code: item.code,
            createdAt: time,
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
      this.getTotalNotification();

      this.notifications.map(item => {
        item.hasRead = true;
      });
    });
  }

  markReadNotification(id: number) {
    this.notificationService.markReadNotification(id).subscribe(res => {
      this.getTotalNotification();

      const notification = this.notifications.find(item => item.id === id);
      if (notification) {
        notification.hasRead = true;
      }
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
      case NotificationCode.BOOKING__HOST_CONFIRM_MET:
      case NotificationCode.BOOKING__HOST_APPROVE_MEETING:
        this.router.navigate([ENDPOINTS.USER_BOOKING_CALENDAR], {
          queryParams: {
            bookingId: notification.bookingId,
            selectedTab: BOOKING_TAB_TYPE.MY_BOOKING
          },
        });
        break;
      case NotificationCode.BOOKING__HAS_BOOKING_ON_POST:
        this.router.navigate([ENDPOINTS.USER_BOOKING_CALENDAR], {
          queryParams: {
            bookingId: notification.bookingId,
            selectedTab: BOOKING_TAB_TYPE.BOOKING
          },
        });
        break;

      case NotificationCode.REVIEW__HAS_REVIEW_ON_POST:
        const url = ENDPOINTS.POST_DETAIL + '/' + notification.postId;
        this.router.navigate([url], {
          queryParams: { reviewId: notification.reviewId },
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
        content = ` <b class="text-12 font-bold">  ${notification?.originUserName} </b> hẹn xem trọ <b> ${notification?.postTitle} </b>`;
        break;
      case NotificationCode.REVIEW__HAS_REVIEW_ON_POST:
        content = `<b class="text-12 font-bold"> ${notification?.originUserName} </b> đánh giá: ${notification.reviewContent} về bài viết <b> ${notification?.postTitle}</b>`;
        break;
      case NotificationCode.BOOKING__HOST_CONFIRM_MET:
        content = `<b class="text-12 font-bold"> ${notification?.originUserName} </b> đã xác nhận bạn đã đến xem trọ <b> ${notification?.postTitle}</b>`;
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
