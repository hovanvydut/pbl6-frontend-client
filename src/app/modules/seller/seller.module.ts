import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';

const COMPONENTS = [
  SellerComponent,
  SellerProfileComponent
]
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([]),
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SellerModule { }
