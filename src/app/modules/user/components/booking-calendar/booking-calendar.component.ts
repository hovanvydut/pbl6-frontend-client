import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarTemplateComponent } from '@app/shared/components/form/calendar/calendar-template/calendar-template.component';
import { MyAvailableCalendarComponent } from './my-available-calendar/my-available-calendar.component';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.scss']
})
export class BookingCalendarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onEditFreeTimeButtonClicked() {
    let dialogRef = this.dialog.open(MyAvailableCalendarComponent, {
      width: '99vw',
      maxHeight: '90vh'
    });
  }
}
