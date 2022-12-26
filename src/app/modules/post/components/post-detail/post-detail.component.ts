import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DEFAULT_IMAGES, fadeInOut } from '@app/shared/app.constants';
import { PostBaseModel, QueryParams } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { PostSwiperComponent } from '../post-swiper/post-swiper.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  animations: [fadeInOut('fadeInOut', 0.2)]
})
export class PostDetailComponent implements OnInit {
  DEFAULT_IMAGES = DEFAULT_IMAGES;
  relatedPosts: PostBaseModel[] = [];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10
  });
  postId: string;
  post: PostBaseModel;
  isLoading: boolean = false;
  postIdKey: string = 'postId';

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (
          this.activatedRoute.snapshot.params[this.postIdKey] !== this.postId
        ) {
          this.postId = this.activatedRoute.snapshot.params[this.postIdKey];
          this.initData();
        }
      }
    });
    this.postId = this.activatedRoute.snapshot.params[this.postIdKey];
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getPostDetail();
    this.getRelatedPosts();
  }

  onAddReview() {
    this.getPostDetail();
  }

  getPostDetail() {
    this.isLoading = true;
    this.postService
      .getPostById(this.postId)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(res => {
        this.post = res;
        const time = new Date(res.createdAt);
        time.setHours(time.getHours() + 7);
        this.post.createdAt = time;
      });
  }

  getRelatedPosts() {
    this.postService.getRelatedPosts(this.queryParams).subscribe(res => {
      this.relatedPosts = res.records;
    });
  }

  viewFullScreen() {
    if (this.post.medias.length > 0) {
      this.dialog.open(PostSwiperComponent, {
        width: '99vw',
        maxHeight: '99vh',
        data: {
          images: this.post.medias
        }
      });
    }
  }
}
