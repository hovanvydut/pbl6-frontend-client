import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostBaseModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: string;
  post: PostBaseModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {
    this.postId = this.activatedRoute.snapshot.params['postId'];
  }

  ngOnInit() {
    this.getPostDetail();
  }

  getPostDetail() {
    this.postService.getPostById(this.postId).subscribe(res => {
      this.post = res;
    });
  }
}
