import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@app/modules/layout/layout.module';
import { MainLayoutComponent } from '../layout/components/main-layout/main-layout.component';

import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostBannerComponent } from './components/post-banner/post-banner.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostDetailCardComponent } from './components/post-detail-card/post-detail-card.component';
import { FilterModule } from '../filter/filter.module';
import { PostComponent } from './post.component';
import { PostFilterLayoutComponent } from './components/post-filter-layout/post-filter-layout.component';
import { PostCardHorizontalComponent } from './components/post-card-horizontal/post-card-horizontal.component';
import { PostRelatedComponent } from './components/post-related/post-related.component';
import { PostTableComponent } from './components/post-table/post-table.component';
import { PostDetailFormComponent } from './components/post-detail-form/post-detail-form.component';
//

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: PostComponent
      },
      {
        path: 'filter',
        component: PostFilterLayoutComponent
      },
      {
        path: 'detail/:postId',
        component: PostDetailComponent
      }
    ]
  }
];

const COMPONENTS = [
  PostComponent,
  PostDetailComponent,
  PostListComponent,
  PostBannerComponent,
  PostCardComponent,
  PostDetailCardComponent,
  PostFilterLayoutComponent
];

const MODULES = [
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  LayoutModule,
  FilterModule,
];
@NgModule({
  imports: [...MODULES, RouterModule.forChild(routes)],
  declarations: [
    ...COMPONENTS,
    PostCardHorizontalComponent,
    PostRelatedComponent,
    PostTableComponent,
    PostDetailFormComponent
  ],
  exports: [...COMPONENTS, PostTableComponent, PostDetailFormComponent]
})
export class PostModule {}
