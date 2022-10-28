import { Component, OnInit } from '@angular/core';
import { FilterService } from '@app/modules/filter/filter.service';
import { Subject, Subscription, finalize } from 'rxjs';
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
    pageNumber: 1,
    pageSize: 10
  });
  totalPosts: number = 0;
  isLoading: boolean = true;

  private _filterParams: Subject<void> = new Subject();
  private subscription: Subscription = new Subscription();

  constructor(
    private postService: PostService,
    private filterService: FilterService
  ) {
    this.subscription.add(
      this.filterService._queryParams.subscribe(params => {
        this.queryParams = params;
        this._filterParams.next();
      })
    );

    this._filterParams.subscribe(() => {
      this.getPosts();
    });
  }

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
