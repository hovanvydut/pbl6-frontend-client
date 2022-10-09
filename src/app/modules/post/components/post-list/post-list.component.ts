import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '@app/modules/post/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() type: 'small' | 'large' = 'small';
  posts: [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((data: any) => {
      this.posts = data;
    });
    return this.posts;
  }

}
