import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { SharedModule } from '@app/shared/shared.module';
//
import { GeneralProfileComponent } from './components/general-profile/general-profile.component';
import { ProfileDetailFormComponent } from './components/profile-detail-form/profile-detail-form.component';
import { LandlordProfileComponent } from './components/landlord-profile/landlord-profile.component';

const COMPONENTS = [GeneralProfileComponent, ProfileDetailFormComponent];

const MODULES = [CommonModule, SharedModule];
@NgModule({
  declarations: [...COMPONENTS, LandlordProfileComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS, LandlordProfileComponent]
})
export class ProfileModule {}
