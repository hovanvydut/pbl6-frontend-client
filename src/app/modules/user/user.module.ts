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
import { PostModule } from '../post/post.module';
import { ProfileModule } from '../profile/profile.module';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { MyAvailableCalendarComponent } from './components/booking-calendar/my-available-calendar/my-available-calendar.component';
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
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-posts',
        component: ManagePostsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'statistics',
        component: StatisticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-coins',
        component: CoinsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-booking-calendar',
        component: BookingCalendarComponent,
        canActivate: [AuthGuard]
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
  DashboardComponent,
  PaymentComponent,
];

const MODULES = [
  RouterModule.forChild(routes),
  SharedModule,
  PostModule,
  ProfileModule
];

@NgModule({
  declarations: [...COMPONENTS, MyAvailableCalendarComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS, MyAvailableCalendarComponent]
})
export class UserModule {
  constructor() {}
}
