import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
//
import { PageNotFoundComponent } from './modules/layout/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@app/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('@app/modules/product/product.module').then(
        (m) => m.ProductModule
      ),
    data: { preload: false },
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('@app/modules/shopping-carts/shopping-carts.module').then(
        (m) => m.ShoppingCartsModule
      ),
    data: { preload: false },
  },
  {
    path: 'category',
    loadChildren: () =>
      import('@app/modules/category/category.module').then(
        (m) => m.CategoryModule
      ),
    data: { preload: false },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@app/modules/admin/admin.module').then((m) => m.AdminModule),
    data: { preload: false },
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('@app/modules/seller/seller.module').then((m) => m.SellerModule),
    data: { preload: false },
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@app/modules/account-setting/account-setting.module').then(
        (m) => m.AccountSettingModule
      ),
    data: { preload: false },
  },
  { path: '**', component: PageNotFoundComponent },
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
exports: [RouterModule],
})
export class AppRoutingModule {}
