import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  message: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      bookingId: string;
      infoDetail?: any;
      isViewMyBooking: boolean;
    },
    private dialog: MatDialog,
    private notifyService: NotifyService,
    private bookingService: BookingService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    if (this.data.bookingId) {
      this.bookingService
        .getDetailBooking(this.data.bookingId)
        .subscribe(res => {
          this.data.infoDetail = res;
          if (res?.time) {
            const time = new Date(res?.time);
            time.setHours(time.getHours() + 7);
            this.data.infoDetail.time = time;
          }

          this.generateMessage();
        });
    } else {
      this.generateMessage();
    }
  }

  generateMessage() {
    if (this.data.infoDetail?.approveTime) {
      if (this.data.isViewMyBooking) {
        this.message = `Bạn được xác nhận đã đến xem trọ vào lúc: ${new Date(
          this.data.infoDetail?.approveTime
        ).toLocaleString()}`;
      } else {
        this.message = `Bạn đã xác nhận đã gặp khách vào lúc: ${new Date(
          this.data.infoDetail?.approveTime
        ).toLocaleString()}`;
      }
    } else {
      if (this.data.isViewMyBooking) {
        this.message = 'Lịch hẹn của bạn chưa được xác nhận';
      } else {
        this.message = 'Bạn chưa xác nhận lịch hẹn này';
      }
    }
  }

  handleSave() {
    if (!this.data.infoDetail?.approveTime) {
      this.approveBooking();
    } else {
      this.confirmMeeting();
    }
  }

  approveBooking() {
    this.bookingService
      .approveBooking(this.data.infoDetail?.id)
      .subscribe(res => {
        this.notifyService.notify('Chấp nhận lịch hẹn xem trọ thành công!');
        this.dialog.closeAll();
      });
  }

  confirmMeeting() {
    this.bookingService
      .confirmMeeting(this.data.infoDetail?.id)
      .subscribe(res => {
        this.notifyService.notify('Xác nhận đã gặp khách thành công!');
        this.dialog.closeAll();
      });
  }
}
