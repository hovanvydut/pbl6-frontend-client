import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileModule } from '../profile/profile.module';
import { PostModule } from '../post/post.module';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-dashboard',
        component: MainDashboardComponent
      }
    ]
  }
];

const MODULES = [
  RouterModule.forChild(routes),
  SharedModule,
  CommonModule,
  ProfileModule,
  PostModule
];

const COMPONENTS = [DashboardComponent, MainDashboardComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class DashboardModule {}
