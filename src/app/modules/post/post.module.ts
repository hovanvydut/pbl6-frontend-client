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
import { PostTableComponent } from './components/post-table/post-table.component';
import { PostDetailFormComponent } from './components/post-detail-form/post-detail-form.component';
import { ProfileModule } from '../profile/profile.module';
import { SwiperModule } from 'swiper/angular';
import { PostSwiperComponent } from './components/post-swiper/post-swiper.component';
import { PostReviewComponent } from './components/post-review/post-review.component';
import { PostBookingComponent } from './components/post-booking/post-booking.component';
import { SavedPostsComponent } from './components/saved-posts/saved-posts.component';
import { PostListTemplateComponent } from './components/post-list-template/post-list-template.component';
import { PostSwiperTemplateComponent } from './components/post-swiper-template/post-swiper-template.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { PostUptopComponent } from './components/post-uptop/post-uptop.component';
import { PostDetailUptopComponent } from './components/post-detail-uptop/post-detail-uptop.component';
//

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: PostComponent
      },
      {
        path: 'filter',
        component: PostFilterLayoutComponent
      },
      {
        path: 'detail/:postId',
        component: PostDetailComponent
      }, 
    ]
  },
];

const COMPONENTS = [
  PostComponent,
  PostDetailComponent,
  PostListComponent,
  PostBannerComponent,
  PostCardComponent,
  PostDetailCardComponent,
  PostFilterLayoutComponent,
  PostCardHorizontalComponent,
  PostTableComponent,
  PostDetailFormComponent,
  PostSwiperComponent,
  PostReviewComponent,
  PostBookingComponent,
  SavedPostsComponent,
  PostListTemplateComponent,
  PostSwiperTemplateComponent,
  ManagePostsComponent,
  PostUptopComponent,
  PostDetailUptopComponent
];

const MODULES = [
  RouterModule.forChild(routes),
  ProfileModule,
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  LayoutModule,
  FilterModule,
  SwiperModule
];
@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
  exports: [
    ...COMPONENTS,
    PostTableComponent,
    PostDetailFormComponent,
    PostSwiperComponent,
    PostReviewComponent,
    PostBookingComponent,
    SavedPostsComponent,
    PostListTemplateComponent,
    PostSwiperTemplateComponent
  ]
})
export class PostModule {}
