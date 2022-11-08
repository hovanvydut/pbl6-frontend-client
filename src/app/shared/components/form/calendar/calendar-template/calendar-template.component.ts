import { NotifyService } from './../../../../services/notify.service';
import { CommonService } from './../../../../../core/services/common.service';
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
import { WeekViewHourColumn } from 'calendar-utils';
import { Subject } from 'rxjs';
import { BOOKING_COLORS } from '@app/shared/app.constants';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  private _events: CalendarEvent[] = [];
  @Input() get events(): CalendarEvent[] {
    return this._events;
  }
  set events(value: CalendarEvent[]) {
    this._events = value;
    this.refresh.next();
  }

  @Output() onSegmentSelected: EventEmitter<Date> = new EventEmitter<Date>;
  @Output() onEventClicked: EventEmitter<any> = new EventEmitter();

  BOOKING_COLORS = BOOKING_COLORS;
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

  constructor( @Inject(MAT_DIALOG_DATA) public data: { events: any[] },
  private commonService: CommonService,
  private notifyService: NotifyService) {}

  ngOnInit(): void {
    if( this.data.events ) {
      this.events = [...this.data.events];
    }
  }

  onSegmentDateClicked(event) {
    if( this.commonService.checkDateIsInThePast(event.date) ) {
      this.notifyService.notify('Bạn không thể chọn ngày trong quá khứ');
      return;
    }
    const addedEvent = this.createEvent(event.date);

    if (this.enableEdit && !this.selectOneSegment) {
      this.events = [...this.events, addedEvent];
      console.log(this.events);
    }

    if(this.selectOneSegment) {
      this.events = [addedEvent];
      this.onSegmentSelected.emit(event.date);
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

  handleEvent(event) {
    this.onEventClicked.emit(event);
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
              const segmentDate = segment.date.getDay() + ':' + segment.date.getHours();
              const date = selectedDay.day + ':' + selectedDay.start;
              if (segmentDate === date) {
                segment.cssClass = 'cal-day-available';
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
    // this.events = [...freeTimes];
  }

  createEvent(date: Date) {
    const selectedDate = date.toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'});
    const addedEvent = {
      start: date,
      end: new Date(date.getTime() + 1000 * 60 * 60),
      title: selectedDate,
      color: { ...BOOKING_COLORS['available'] },
      draggable: true
    };
    return addedEvent;
  }
}
