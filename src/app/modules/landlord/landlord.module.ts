import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandlordComponent } from './landlord.component';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/components/main-layout/main-layout.component';
import { LandlordInfoComponent } from './landlord-info/landlord-info.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

const COMPONENTS = [LandlordComponent, LandlordInfoComponent];

const MODULES = [CommonModule, LayoutModule, FormsModule, SharedModule];

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'profile/:landlordId',
        component: LandlordComponent
      },
      {
        path: 'manage-posts',
        // component: ManagePostsComponent
      }
    ]
  }
];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class LandlordModule {}
