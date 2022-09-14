import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '', component: AdminComponent,
      // canActivate: [AdminAuthGuard],
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
