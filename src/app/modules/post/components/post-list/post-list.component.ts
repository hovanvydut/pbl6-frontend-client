import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { PostBaseModel, QueryParams } from './../../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() type: 'small' | 'large' = 'small';
  posts: PostBaseModel[] = [];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10
  })
  totalPosts: number = 0;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts(this.queryParams).subscribe((res) => {
      this.posts = res.records;
      this.totalPosts = res.totalRecords;
    });
  }

  pageChangeEvent(event: { pageIndex: number, pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.getPosts();
  }
}
