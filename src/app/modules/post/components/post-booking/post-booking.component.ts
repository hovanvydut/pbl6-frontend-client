import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from '@app/modules/booking-calendar/services/booking.service';
import { InfoDialogComponent } from '@app/shared/components/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-post-booking',
  templateUrl: './post-booking.component.html',
  styleUrls: ['./post-booking.component.scss']
})
export class PostBookingComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    phoneNumber: ['', Validators.required]
  });

  selectedDate: Date;
  selecteDateString = '';
  events: CalendarEvent[];

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { post: any },
    private bookingService: BookingService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.bookingService.getHostFreeTime(this.data.post.id).subscribe(res => {
      this.events = res;
    });
  }

  handleSegmentSelected(date: Date) {
    this.selectedDate = date;
    this.selecteDateString = date.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit'
    });
  }

  onBooking() {
    this.bookingService
      .createBooking({
        postId: this.data.post.id,
        date: this.selectedDate.toISOString()
      })
      .subscribe(
        res => {
          this.dialog.closeAll();
          let dialogRef = this.dialog.open(InfoDialogComponent, {
            data: {
              title: 'Đặt lịch thành công',
              description: `Chúng mình đã thông báo cho chủ trọ, 
              bạn đợi chủ trọ xác nhận bạn nhé!`,
            }
          });
        },
        err => {
          this.notifyService.notify(err);
        }
      );
  }
}
