import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { subDays, startOfDay, addDays, endOfDay } from 'date-fns';
import { EventColor } from 'calendar-utils';
import { Subject } from 'rxjs';

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
  @Input() view: CalendarView = CalendarView.Week;
  @Input() enableEdit: boolean = true;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [
    {
      label: `x`,
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.deleteEvent(event);
      }
    }
  ];
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];

  constructor() {}

  onSegmentDateClicked(event) {
    if (this.enableEdit) {
      const addedEvent = {
        start: event.date,
        end: new Date(event.date.getTime() + 1000 * 60 * 60),
        title: 'Có thể đến xem trọ',
        color: { ...colors['available'] },
        actions: this.actions,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      };
      this.events = [...this.events, addedEvent];
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

  ngOnInit(): void {}
}
