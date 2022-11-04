import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyAvailableCalendarComponent } from './../my-available-calendar/my-available-calendar.component';

@Component({
  selector: 'app-booking-appointment',
  templateUrl: './booking-appointment.component.html',
  styleUrls: ['./booking-appointment.component.scss']
})
export class BookingAppointmentComponent implements OnInit {
  @ViewChild('myFreetime') myFreeTime;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEditFreeTimeButtonClicked() {
    let dialogRef = this.dialog.open(MyAvailableCalendarComponent, {
      width: '99vw',
      maxHeight: '90vh'
    });
  }
}