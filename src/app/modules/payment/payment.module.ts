import { LandlordGuard } from './../../core/guards/landlord.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SharedModule } from '@app/shared/shared.module';
import { PaymentComponent } from './payment.component';
import { CoinsComponent } from './coins/coins.component';
import { PaymentTransactionComponent } from './payment-transaction/payment-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  PaymentComponent,
  PaymentFormComponent,
  CoinsComponent,
  PaymentTransactionComponent
];

export const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
    canActivate: [AuthGuard, LandlordGuard],
    children: [
      {
        path: '',
        component: CoinsComponent
      }
    ]
  }
];

const MODULES = [RouterModule.forChild(routes), SharedModule, CommonModule, ReactiveFormsModule, FormsModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class PaymentModule {}
