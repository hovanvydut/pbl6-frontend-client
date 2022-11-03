import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { SidebarLayoutComponent } from '../layout/components/sidebar-layout/sidebar-layout.component';
import { ProfileComponent } from './user.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
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
  StatisticsComponent,
  ManagePostsComponent,
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
