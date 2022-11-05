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
  freeTimes: any[] = [];
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
        this.freeTimes = res.map((e: any) => {
          return {
            day: e.day,
            start: parseInt(e.start, 10),
            end: parseInt(e.end, 10)
          };
        });
      });
  }

  onSaveCalendarSettingsButtonClicked() {
    const data = {
      data: this.calendar.events.map(e => {
        return {
          day: e.start.getDay(),
          start: e.start.getHours().toString(),
          end: e.end.getHours().toString()
        };
      })
    };
    this.bookingService.updateHostFreeTime(data).subscribe(res => {
      this.dialog.closeAll();
    });
  }
}
