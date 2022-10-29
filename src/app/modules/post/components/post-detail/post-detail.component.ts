import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { PostBaseModel, QueryParams } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { PostSwiperComponent } from '../post-swiper/post-swiper.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  posts: PostBaseModel[] = [];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 0,
    pageSize: 10
  })
  postId: string;
  post: PostBaseModel;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.postId = this.activatedRoute.snapshot.params['postId'];
  }

  ngOnInit() {
    this.getPostDetail();
    this.getPosts();
  }

  getPostDetail() {
    this.postService.getPostById(this.postId).subscribe(res => {
      this.post = res;
    });
  }

  getPosts() {
    this.postService.getPosts(this.queryParams).subscribe((res) => {
      this.posts = res.records;
    });
  }

  viewFullScreen() {
    if (this.post.medias.length > 0) {
      let dialogRef = this.dialog.open(PostSwiperComponent, {
        width: '99vw',
        maxHeight: '99vh',
        data: {
          images: this.post.medias
        }
      });
    }
  }
}
