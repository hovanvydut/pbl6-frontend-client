import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralProfileComponent } from './components/general-profile/general-profile.component';
import { ProfileDetailFormComponent } from './components/profile-detail-form/profile-detail-form.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    GeneralProfileComponent,
    ProfileDetailFormComponent
  ],
  imports: [
  CommonModule,
    SharedModule
  ],
  exports: [
    GeneralProfileComponent,
    ProfileDetailFormComponent
  ]
})
export class ProfileModule {

}
