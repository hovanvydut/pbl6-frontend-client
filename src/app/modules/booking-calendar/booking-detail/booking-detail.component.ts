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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { infoDetail: any },
    private dialog: MatDialog,
    private notifyService: NotifyService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    console.log(this.data.infoDetail);
  }

  approveBooking() {
    this.bookingService.approveAppointment(this.data.infoDetail.id).subscribe(
      res => {
        this.notifyService.notify('Chấp nhận lịch hẹn xem trọ thành công!');
        this.dialog.closeAll();
      });
  }
}
