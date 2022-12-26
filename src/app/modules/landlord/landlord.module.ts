import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandlordComponent } from './landlord/landlord.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '@app/shared/shared.module';
import { PostModule } from '../post/post.module';
import { MainLayoutComponent } from '../layout/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: ':landlordId',
        component: LandlordComponent
      }
    ]
  }
];

const COMPONENTS = [LandlordComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ProfileModule,
    SharedModule,
    PostModule
  ],
  exports: [...COMPONENTS]
})
export class LandlordModule {}
