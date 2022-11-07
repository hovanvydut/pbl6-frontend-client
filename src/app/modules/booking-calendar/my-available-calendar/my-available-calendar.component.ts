import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from '@app/core/services/base.service';
import { CalendarTemplateComponent } from '@app/shared/components/form/calendar/calendar-template/calendar-template.component';
import { DecimalPipe } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { TIME_SLOTS, WEEK_DAYS } from '@app/shared/app.constants';

@Component({
  selector: 'app-my-available-calendar',
  templateUrl: './my-available-calendar.component.html',
  styleUrls: ['./my-available-calendar.component.scss']
})
export class MyAvailableCalendarComponent implements OnInit {
  @ViewChild('calendar') calendar: CalendarTemplateComponent;
  freeTimes: any[] = [];

  WEEK_DAYS = [
    {
      label: 'Ngay',
      value: null
    },
    ...WEEK_DAYS
  ];
  TIME_SLOTS = TIME_SLOTS;

  days = [];

  constructor(
    private dialog: MatDialog,
    private decimalPipe: DecimalPipe,
    private bookingService: BookingService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.WEEK_DAYS.forEach((day, index) => {
      this.days.push({
        label: day.label,
        value: day.value,
        timeSlots: this.TIME_SLOTS.map(time => {
          return {
            label: time.label,
            start: time.start,
            end: time.end,
            selected: false
          };
        })
      });
    });

    console.log(this.days);
  }

  convertFreeTimes() {
    this.days.forEach((day, index) => {
      day.timeSlots.forEach(time => {
        if(this.freeTimes.find(e => e.day === day.value && e.start === time.start && e.end === time.end)) {
          time.selected = true;
        }
      });
    });
  }

  selectTimeSlot(dayIndex, timeIndex) {
    this.days[dayIndex].timeSlots[timeIndex].selected = !this.days[dayIndex]
      .timeSlots[timeIndex].selected;
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
        this.convertFreeTimes();
      });
  }

  onSaveCalendarSettingsButtonClicked() {
    const days = this.days
      .filter(day => day.value)
      .map(day => {
        return day.timeSlots
          .filter(time => time.selected)
          .map(time => {
            return {
              day: day.value,
              start: time.start.toString(),
              end: time.end.toString()
            };
          });
      });
    this.freeTimes = [];
    days.forEach(day => {
      day.forEach(time => {
        this.freeTimes.push(time);
      });
    });

    this.bookingService.updateHostFreeTime({
      "data": this.freeTimes
    }).subscribe(res => {
      this.dialog.closeAll();
    });
  }
}
