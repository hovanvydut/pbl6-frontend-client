import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
//
import { PageNotFoundComponent } from './modules/layout/components/page-not-found/page-not-found.component';
import { ViewIconsComponent } from './shared/components/view-icons/view-icons.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/post',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'landlord',
    loadChildren: () =>
      import('@app/modules/landlord/landlord.module').then(
        m => m.LandlordModule
      ),
    data: { preload: false }
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('@app/modules/post/post.module').then(m => m.PostModule),
    data: { preload: false }
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('@app/modules/admin/admin.module').then(m => m.AdminModule),
    data: { preload: false }
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@app/modules/account-setting/account-setting.module').then(
        m => m.AccountSettingModule
      ),
    data: { preload: false }
  },
  {
    path: 'styles/icons',
    component: ViewIconsComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
