import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
//
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoDetailComponent } from './components/account-info-detail/account-info-detail.component';
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { SvgIconsRegistryService } from '@app/shared/services/svg-icon-registry.service';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';

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

const SVG_ICONS = completeIconSet;

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class AccountInfoModule {
  constructor(private svgIconRegistry: SvgIconsRegistryService) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
