import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@app/modules/layout/layout.module';
import { SellerModule } from '@app/modules/seller/seller.module';
//
import { MainLayoutComponent } from '../layout/components/main-layout/main-layout.component';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductBannerComponent } from './components/product-banner/product-banner.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductSidebarComponent } from './components/product-sidebar/product-sidebar.component';
import { ProductDetailCardComponent } from './components/product-detail-card/product-detail-card.component';
//

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path: ':productId',
        component: ProductDetailComponent,
      },
    ],
  },
];

const COMPONENTS = [
  ProductComponent,
  ProductDetailComponent,
  ProductListComponent,
  ProductBannerComponent,
  ProductCardComponent,
  ProductSidebarComponent,
  ProductDetailCardComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ...COMPONENTS
  ]
})
export class ProductModule { }
