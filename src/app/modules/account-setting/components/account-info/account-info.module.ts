import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
//
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoDetailComponent } from './components/account-info-detail/account-info-detail.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AccountInfoDetailComponent,
    // canDeactivate: [DeactivateGuard]
  },
  {
    path: 'business-profile',
    component: BusinessProfileComponent,
    // canActivate: [BusinessProfileGuard],
    // canDeactivate: [DeactivateGuard]
  },
];

const COMPONENTS = [
  AccountInfoComponent,
  AccountInfoDetailComponent,
  BusinessProfileComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class AccountInfoModule {}
