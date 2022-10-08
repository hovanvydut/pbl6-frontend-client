import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@app/modules/layout/layout.module';
import { MainLayoutComponent } from '../layout/components/main-layout/main-layout.component';

import { ProductComponent } from './post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostBannerComponent } from './components/post-banner/post-banner.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostDetailCardComponent } from './components/post-detail-card/post-detail-card.component';
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
        component: PostDetailComponent,
      },
    ],
  },
];

const COMPONENTS = [
  ProductComponent,
  PostDetailComponent,
  PostListComponent,
  PostBannerComponent,
  PostCardComponent,
  PostDetailCardComponent
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
export class PostModule { }
