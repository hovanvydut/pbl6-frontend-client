import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BOOKING_COLORS } from '@app/shared/app.constants';
import { CalendarEvent } from 'angular-calendar';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { BookingService } from '../services/booking.service';
import { MyAvailableCalendarComponent } from './../my-available-calendar/my-available-calendar.component';
import { ActivatedRoute } from '@angular/router';
import { BOOKING_TABS } from './../const/booking.const';
import { BOOKING_TAB_TYPE } from '../enums/booking.enum';
import { CheckPermissionPipe } from '@app/shared/pipes/check-permission.pipe';
import { PermissionType } from '@app/shared/app.enum';
import { NotifyService } from '@app/shared/services/notify.service';
@Component({
  selector: 'app-booking-appointment',
  templateUrl: './booking-appointment.component.html',
  styleUrls: ['./booking-appointment.component.scss']
})
export class BookingAppointmentComponent implements OnInit {
  @ViewChild('myFreetime') myFreeTime;
  appointments: any[] = [];
  events: CalendarEvent[] = [];
  hasLandlordPermission: boolean = false;

  tabs = BOOKING_TABS;
  selectedTab = this.tabs[0].id;

  constructor(
    private dialog: MatDialog,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private checkPermissionPipe: CheckPermissionPipe,
    private notifyService: NotifyService
  ) {
    this.hasLandlordPermission =
      this.checkPermissionPipe.transform(
        PermissionType.BookingApproveMeeting
      ) ||
      this.checkPermissionPipe.transform(PermissionType.BookingConfirmMet) ||
      this.checkPermissionPipe.transform(PermissionType.BookingViewAllPersonal);

    this.tabs.forEach(tab => {
      switch (tab.id) {
        case BOOKING_TAB_TYPE.BOOKING:
          tab.isVisible = this.hasLandlordPermission;
          break;
        case BOOKING_TAB_TYPE.MY_BOOKING:
          tab.isVisible = this.checkPermissionPipe.transform(
            PermissionType.BookingViewAllBooked
          );
          break;
      }
    });

    this.tabs.filter(_ => _.isVisible);

    this.selectedTab = this.hasLandlordPermission
      ? this.tabs[0].id
      : this.tabs[1].id;
  }

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('selectedTab');
    if (tab) {
      this.selectedTab = tab;
    }

    const bookingId = this.route.snapshot.queryParamMap.get('bookingId');
    if (bookingId) {
      let dialogRef = this.dialog.open(BookingDetailComponent, {
        maxWidth: '99vw',
        maxHeight: '90vh',
        data: {
          bookingId: bookingId,
          isViewMyBooking:
            this.selectedTab === BOOKING_TAB_TYPE.MY_BOOKING ? true : false
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.handleGetBookings();
      });
    }
    this.handleGetBookings();
  }

  getBookings() {
    this.bookingService.getAllBooking().subscribe(res => {
      this.events = res.records.map(item => {
        const time = new Date(item.time);
        time.setHours(time.getHours() + 7);
        const event = {
          id: item.id,
          start: time,
          end: new Date(time.getTime() + 1000 * 60 * 60),
          title: item.guestInfo.displayName,
          color: { ...BOOKING_COLORS['new'] },
          infoDetail: item,
          actions: [
            {
              label: `👀`,
              a11yLabel: 'Xem chi tiết',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.viewDetail(event);
              }
            }
          ],
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: false
        };

        if (event.infoDetail?.approveTime) {
          event.color = { ...BOOKING_COLORS['approved'] };
        }
        if (event.infoDetail?.met) {
          event.color = { ...BOOKING_COLORS['done'] };
        }
        // {
        //   label: `🆕`,
        //   a11yLabel: 'Chưa xác nhận',
        // },
        // {
        //   label: `✅`,
        //   a11yLabel: 'Đã xác nhận',
        // }, {
        //   label: `🧑‍🤝‍🧑`,
        //   a11yLabel: 'Đã gặp',
        // }
        return event;
      });
    });
  }

  getMyBookings() {
    this.bookingService.getMyBookings().subscribe(res => {
      this.events = res.records.map(item => {
        const data = item;
        const time = new Date(item.time);
        time.setHours(time.getHours() + 7);
        data.time = time;
        const event = {
          id: item.id,
          start: time,
          end: new Date(time.getTime() + 1000 * 60 * 60),
          title: item.guestInfo.displayName,
          color: { ...BOOKING_COLORS['new'] },
          infoDetail: data,
          actions: [
            {
              label: `👀`,
              a11yLabel: 'Xem chi tiết',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.viewDetail(event);
              }
            }
          ],
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: false
        };

        if (event.infoDetail?.approveTime) {
          event.color = { ...BOOKING_COLORS['approved'] };
        }
        if (event.infoDetail?.met) {
          event.color = { ...BOOKING_COLORS['done'] };
        }
        return event;
      });
    });
  }

  onEditFreeTimeButtonClicked() {
    let dialogRef = this.dialog.open(MyAvailableCalendarComponent, {
      width: '99vw',
      maxHeight: '90vh',
      data: {
        events: this.events
      }
    });
  }

  getMondayOfCurrentWeek(day) {
    const today = new Date();
    const first = today.getDate() - today.getDay() + day;

    const monday = new Date(today.setDate(first));
    return monday;
  }

  toIsoString(utcDate) {
    const date = new Date(utcDate);
    return new Date(date.toISOString());
  }

  viewDetail(event) {
    event.infoDetail.time = new Date(event.infoDetail.time);
    event.infoDetail.time.setHours( event.infoDetail.time.getHours() + 7);
    let dialogRef = this.dialog.open(BookingDetailComponent, {
      maxWidth: '99vw',
      maxHeight: '90vh',
      data: {
        infoDetail: event.infoDetail,
        isViewMyBooking: this.selectedTab === 'my-booking' ? true : false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.handleGetBookings();
    });
  }

  onTabChanged() {
    this.handleGetBookings();
  }

  handleGetBookings() {
    if (this.selectedTab === BOOKING_TAB_TYPE.BOOKING) {
      this.getBookings();
    } else {
      this.getMyBookings();
    }
  }
}
