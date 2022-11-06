import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../services/booking.service';
import { MyAvailableCalendarComponent } from './../my-available-calendar/my-available-calendar.component';

@Component({
  selector: 'app-booking-appointment',
  templateUrl: './booking-appointment.component.html',
  styleUrls: ['./booking-appointment.component.scss']
})
export class BookingAppointmentComponent implements OnInit {
  @ViewChild('myFreetime') myFreeTime;
  appointments: any[] = [];
  constructor(
    private dialog: MatDialog,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingService.getAllBooking().subscribe(res => {
      this.appointments = res.records.map(item => {
        return {
          id: item.id,
          title: 'xxx',
          start: new Date(item.time),
          end: new Date(new Date(item.time).getTime() + 1000 * 60 * 60),
          color: 'black',
          draggable: false,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        };
      });
      console.log(this.appointments);
    });
  }

  onEditFreeTimeButtonClicked() {
    let dialogRef = this.dialog.open(MyAvailableCalendarComponent, {
      width: '99vw',
      maxHeight: '90vh'
    });
  }
}
