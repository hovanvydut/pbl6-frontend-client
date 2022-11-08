import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SidebarLayoutComponent } from '@app/modules/layout/components/sidebar-layout/sidebar-layout.component';
import { PostModule } from '@app/modules/post/post.module';
import { ProfileModule } from '@app/modules/profile/profile.module';
import { SharedModule } from '@app/shared/shared.module';
export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
        import('@app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('@app/modules/post/post.module').then(m => m.PostModule)
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

const COMPONENTS = [PageComponent];

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
export class PageModule {}
