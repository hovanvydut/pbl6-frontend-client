import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { MainLayoutComponent } from '../layout/components/main-layout/main-layout.component';


const COMPONENTS = [
  CategoryComponent,
]

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   component: CategoryComponent,
      // },
      {
        path: ':categoryId',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LayoutModule,
    RouterModule.forChild(routes),
  ],
  exports: [...COMPONENTS],
  declarations: [
    ...COMPONENTS
  ]
})
export class CategoryModule { }
