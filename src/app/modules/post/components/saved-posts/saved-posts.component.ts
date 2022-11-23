import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PostBaseModel, QueryParams } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-saved-posts',
  templateUrl: './saved-posts.component.html',
  styleUrls: ['./saved-posts.component.scss']
})
export class SavedPostsComponent implements OnInit {
  posts: PostBaseModel[] = [];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 0,
    pageSize: 4
  });
  totalPosts: number = 0;
  isLoading: boolean = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
    this.postService
      .getSavedPosts(this.queryParams)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(res => {
        this.posts = res.records.map(
          post =>
            new PostBaseModel({
              ...post,
              isBookmarked: true
            })
        );
        this.totalPosts = res.totalRecords;
      });
  }

  pageChangeEvent(event: { pageIndex: number, pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    if(event.pageIndex > this.queryParams.pageNumber) {
      this.queryParams.pageNumber = event.pageIndex + 1;
    } else if(event.pageIndex < this.queryParams.pageNumber) {
      this.queryParams.pageNumber = event.pageIndex - 1;
    }
    this.getPosts();
  }
}
