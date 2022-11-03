import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from '@app/core/services/base.service';
import { CalendarTemplateComponent } from '@app/shared/components/form/calendar/calendar-template/calendar-template.component';
import { DecimalPipe } from '@angular/common';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-my-available-calendar',
  templateUrl: './my-available-calendar.component.html',
  styleUrls: ['./my-available-calendar.component.scss']
})
export class MyAvailableCalendarComponent implements OnInit {
  @ViewChild('calendar') calendar: CalendarTemplateComponent;

  constructor(
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe,
    private bookingService: BookingService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.bookingService
      .getHostFreeTime(this.baseService.currentUser.id)
      .subscribe((res: any) => {
        // this.calendar.setCalendar(res);
        console.log(res);
      });
  }

  onSaveCalendarSettingsButtonClicked() {

    console.log(
      this.calendar.events.map(e => {
        return {
          day: e.start.getDay(),
          start: e.start.getHours() + ':' + this.decimalPipe.transform(e.start.getMinutes(), '2.0'),
          end: e.end.getHours() + ':' + this.decimalPipe.transform(e.end.getMinutes(), '2.0')
        };
      })
    );
    this.dialog.closeAll();
  }
}
