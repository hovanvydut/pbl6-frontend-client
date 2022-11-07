import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BOOKING_COLORS } from '@app/shared/app.constants';
import { CalendarEvent } from 'angular-calendar';
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
  events: CalendarEvent[] = [];

  constructor(
    private dialog: MatDialog,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingService.getAllBooking().subscribe(res => {
      this.events = res.records.map(item => {
        const event = {
          start: new Date(item.time),
          end: new Date( new Date(item.time).getTime() + 1000 * 60 * 60),
          title: item.guestInfo.displayName,
          color: { ...BOOKING_COLORS['available'] },
          actions: [
            {
              label: '',
              a11yLabel: 'Delete'
            }
          ],
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: false
        };
        return event;
      });
      console.log(this.events);
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
    console.log(new Date(date.toISOString()));
    return new Date(date.toISOString());
  }
}
