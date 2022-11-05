import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent
} from 'angular-calendar';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { subDays, startOfDay, addDays, endOfDay } from 'date-fns';
import { EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';

const colors: Record<string, EventColor> = {
  booked: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  available: {
    primary: '#7ba5c5',
    secondary: '#7ba5c5'
  }
};

@Component({
  selector: 'app-calendar-template',
  templateUrl: './calendar-template.component.html',
  styleUrls: ['./calendar-template.component.scss']
})
export class CalendarTemplateComponent implements OnInit {
  @Input() hideHeaderDate: boolean = false;
  @Input() showNavigateButtons: boolean = false;
  @Input() selectOneSegment: boolean = false;
  @Input() view: CalendarView = CalendarView.Week;
  @Input() enableEdit: boolean = true;
  @Input() freeTimes: any[] = [];
  @Input() selectedDays: any[] = [];

  @Output() onSegmentSelected: EventEmitter<Date> = new EventEmitter<Date>;

  events: CalendarEvent[] = [];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [
    {
      label: ``,
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.deleteEvent(event);
      }
    }
  ];
  selectedDayViewDate: Date;
  hourColumns: WeekViewHourColumn[];
  refresh = new Subject<void>();

  activeDayIsOpen: boolean = true;

  constructor(private decimalPipe: DecimalPipe,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.events = [...this.freeTimes];
  }

  onSegmentDateClicked(event) {
    const addedEvent = this.createEvent(event.date);
    if (this.enableEdit && !this.selectOneSegment) {
      this.events.push(addedEvent);
      this.cdr.detectChanges();
    }

    if(this.selectOneSegment) {
      this.events = [addedEvent];
      this.onSegmentSelected.emit(event.date)
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    let freeTimes = [];
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          // check list of selected days
          if (this.selectedDays && this.selectedDays.length > 0) {
            this.selectedDays.forEach((selectedDay) => {
              if (segment.date.getDay() === selectedDay.day && segment.date.getHours() === selectedDay.start) {
                segment.cssClass = 'cal-day-selected';
              }
            });
          }
          // check list of free times
          if (this.freeTimes && this.freeTimes.length > 0) {
            this.freeTimes.forEach((freeTime) => {

              if (segment.date.getDay() === freeTime.day && segment.date.getHours() === freeTime.start) {
                freeTimes.push(this.createEvent(segment.date));
              }
            });
          }
        });
      });
    });
    this.events = [...freeTimes];
  }

  createEvent(date: Date) {
    const selectedDate = date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
    const addedEvent = {
      start: date,
      end: new Date(date.getTime() + 1000 * 60 * 60),
      title: selectedDate,
      color: { ...colors['available'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    };
    return addedEvent;
  }
}
