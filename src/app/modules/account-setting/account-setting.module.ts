import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { SidebarLayoutComponent } from '../layout/components/sidebar-layout/sidebar-layout.component';
import { AccountSettingComponent } from './account-setting.component';
import { AccountAddressesComponent } from './components/account-addresses/account-addresses.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
      {
        path: 'account-address',
        component: AccountAddressesComponent,
      },
      {
        path: 'settings',
        component: AccountInfoComponent,
      },
      {
        path: 'info',
        loadChildren: () =>
          import('./components/account-info/account-info.module').then(
            (m) => m.AccountInfoModule
          ),
      },
    ],
  },
];

const COMPONENTS = [
  AccountAddressesComponent,
  AccountSettingComponent,

];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [...COMPONENTS],
})


export class AccountSettingModule {
  constructor() {}
}
