import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { SidebarLayoutComponent } from '../layout/components/sidebar-layout/sidebar-layout.component';
import { ProfileComponent } from './user.component';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';
import { CoinsComponent } from './components/coins/coins.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'my-posts',
        component: ManagePostsComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'my-coins',
        component: CoinsComponent
      },
      {
        path: 'my-booking-calendar',
        component: BookingCalendarComponent
      }
    ]
  }
];

const COMPONENTS = [
  ProfileComponent,
  BookingCalendarComponent,
  CoinsComponent,
  StatisticsComponent,
  ManagePostsComponent,
  DashboardComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [...COMPONENTS]
})
export class UserModule {
  constructor() {}
}
