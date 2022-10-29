import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '@app/shared/app.constants';
import { PostBaseModel, QueryParams } from '../../models/post.model';

@Component({
  selector: 'app-post-list-template',
  templateUrl: './post-list-template.component.html',
  styleUrls: ['./post-list-template.component.scss'],
  animations: [fadeInOut('fadeInOut', 0.2)]
})
export class PostListTemplateComponent implements OnInit {
  @Input() type: 'small' | 'large' = 'small';
  @Input() isShowPagination: boolean = true;
  @Input() posts: PostBaseModel[] = [];
  @Input() emptyPostDescription: string = 'Không có bài viết nào';
  @Input() queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10
  });
  @Input() totalPosts: number = 0;
  @Input() emptyPostImageStyle: string = 'h-210';

  constructor() {}

  ngOnInit() {}

  pageChangeEvent(event: { pageIndex: number; pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.pageNumber = event.pageIndex + 1;
  }
}
