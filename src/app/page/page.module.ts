import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarLayoutComponent } from '@app/modules/layout/components/sidebar-layout/sidebar-layout.component';
import { ManagePostsComponent } from '@app/modules/post/components/manage-posts/manage-posts.component';
export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@app/modules/dashboard/dashboard.module').then(
            m => m.DashboardModule
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
      },
      {
        path: 'manage-posts',
        component: ManagePostsComponent
      }
    ]
  }
];

const COMPONENTS = [PageComponent];

const MODULES = [RouterModule.forChild(routes)];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class PageModule {}
