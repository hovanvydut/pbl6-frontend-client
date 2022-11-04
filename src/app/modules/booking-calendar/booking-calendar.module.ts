import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingAppointmentComponent } from './booking-appointment/booking-appointment.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SharedModule } from '@app/shared/shared.module';
import { MyAvailableCalendarComponent } from './my-available-calendar/my-available-calendar.component';
import { BookingCalendarComponent } from './booking-calendar.component';

const COMPONENTS = [
  BookingAppointmentComponent,
  MyAvailableCalendarComponent,
  BookingCalendarComponent
];

export const routes: Routes = [
  {
    path: '',
    component: BookingCalendarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'appointments',
        component: BookingAppointmentComponent,
      }
    ]
  }
];

const MODULES = [RouterModule.forChild(routes), SharedModule, CommonModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class BookingCalendarModule {}
