import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { SidebarLayoutComponent } from '../layout/components/sidebar-layout/sidebar-layout.component';

const COMPONENTS = [
  SellerComponent,
  SellerProfileComponent
]

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
        component: SellerProfileComponent
      },
      {
        path: 'products',
        component: SellerProfileComponent
      },
      {
        path: 'general',
        component: SellerProfileComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SellerModule { }
