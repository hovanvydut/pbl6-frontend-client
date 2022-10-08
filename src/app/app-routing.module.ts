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
      import('@app/modules/product/post.module').then(
        (m) => m.PostModule
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
