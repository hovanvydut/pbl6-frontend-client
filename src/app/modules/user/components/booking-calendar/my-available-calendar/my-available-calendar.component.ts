import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarTemplateComponent } from '@app/shared/components/form/calendar/calendar-template/calendar-template.component';

@Component({
  selector: 'app-my-available-calendar',
  templateUrl: './my-available-calendar.component.html',
  styleUrls: ['./my-available-calendar.component.scss']
})
export class MyAvailableCalendarComponent implements OnInit {
  @ViewChild('calendar') calendar: CalendarTemplateComponent;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSaveCalendarSettingsButtonClicked() {
    console.log(this.calendar.events);
    this.dialog.closeAll();
  }
}
