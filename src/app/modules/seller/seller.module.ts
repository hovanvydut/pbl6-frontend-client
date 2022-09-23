import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SidebarLayoutComponent } from '../layout/components/sidebar-layout/sidebar-layout.component';
import { from } from 'rxjs';
import {
  SellerDashboardComponent,
  SellerOrdersComponent,
  SellerProductsComponent,
  SellerProfileComponent
} from './components';

const COMPONENTS = [
  SellerComponent,
  SellerProfileComponent,
  SellerDashboardComponent,
  SellerOrdersComponent,
  SellerProductsComponent
];

export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'ordered',
        pathMatch: 'full'
      },
      {
        path: 'business-profile',
        component: SellerProfileComponent
      },
      {
        path: 'orders',
        component: SellerOrdersComponent
      },
      {
        path: 'products',
        component: SellerProductsComponent
      },
      {
        path: 'general',
        component: SellerDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SellerModule {}
