import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { SharedModule } from '@app/shared/shared.module';
//
import { ShoppingCartsComponent } from './shopping-carts.component';
import { SidebarLayoutComponent } from '@app/modules/layout/components/sidebar-layout/sidebar-layout.component';

const COMPONENTS = [ShoppingCartsComponent];

export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'shopping-carts',
        pathMatch: 'full'
      },
      {
        path: 'shopping-carts',
        component: ShoppingCartsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class ShoppingCartsModule {}
