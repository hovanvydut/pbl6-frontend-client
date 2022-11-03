import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { SidebarLayoutComponent } from '../layout/components/sidebar-layout/sidebar-layout.component';
import { ProfileComponent } from './user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostModule } from '../post/post.module';
import { ProfileModule } from '../profile/profile.module';
import { AuthGuard } from '@app/core/guards/auth.guard';
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
        path: 'posts',
        loadChildren: () =>
        import('@app/modules/post/post.module').then(
          m => m.PostModule
        )
      },
      {
        path: 'statistics',
        loadChildren: () =>
        import('@app/modules/statistics/statistics.module').then(
          m => m.StatisticsModule
        )
      },
      {
        path: 'payment',
        loadChildren: () =>
        import('@app/modules/payment/payment.module').then(
          m => m.PaymentModule
        )
      },
      {
        path: 'booking-calendar',
        loadChildren: () =>
          import('@app/modules/booking-calendar/booking-calendar.module').then(
            m => m.BookingCalendarModule
          )
      }
    ]
  }
];

const COMPONENTS = [
  ProfileComponent,
  DashboardComponent,
];

const MODULES = [
  RouterModule.forChild(routes),
  SharedModule,
  PostModule,
  ProfileModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class UserModule {
  constructor() {}
}
