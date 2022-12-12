import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
//
import { PageNotFoundComponent } from './modules/layout/components/page-not-found/page-not-found.component';
import { ViewIconsComponent } from './shared/components/view-icons/view-icons.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts/dashboard',
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
      import('@app/modules/landlord/landlord.module').then(m => m.LandlordModule),
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
    data: { preload: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@app/page/page.module').then(
        m => m.PageModule
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
