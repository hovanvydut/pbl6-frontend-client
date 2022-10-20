import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

const routes: Routes = [
  {
      path: '', component: AdminComponent,
      children: [
          {
              path: '', redirectTo: 'subscription-plan', pathMatch: 'full'
          },
          {
              path: 'subscription-assignment',
              // component: SubscriptionAssignmentComponent,
          }
      ]
  },
  {
      // path: 'login', component: LoginComponent,
  }
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
