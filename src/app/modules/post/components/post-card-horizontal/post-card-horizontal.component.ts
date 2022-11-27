import { CommonService } from './../../../../core/services/common.service';
import { Component, Input, OnInit } from '@angular/core';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { PostService } from '@app/modules/post/services/post.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { BookmarkService } from '../../services/bookmark.service';
import { DEFAULT_IMAGES } from '@app/shared/app.constants';
@Component({
  selector: 'app-post-card-horizontal',
  templateUrl: './post-card-horizontal.component.html',
  styleUrls: ['./post-card-horizontal.component.scss']
})
export class PostCardHorizontalComponent implements OnInit {
  @Input() post: any;
  DEFAULT_IMAGES = DEFAULT_IMAGES;
  ENDPOINTS = ENDPOINTS;

  constructor(
    private bookmarkService: BookmarkService,
    private notifyService: NotifyService,
    private commonService: CommonService
  ) {}

  ngOnInit() {}

  onBookmarkButtonClicked() {
    if (!this.commonService.validateAuthentication()) {
      this.notifyService.notify('Đăng nhập để lưu bài viết');
      return;
    }
    if (this.post.isBookmarked) {
      this.bookmarkService.removeBookmark(this.post.id).subscribe(() => {
        this.post.isBookmarked = false;
        this.notifyService.notify('Đã bỏ lưu bài đăng');
      });
    } else {
      this.bookmarkService.addBookmark(this.post.id).subscribe(() => {
        this.post.isBookmarked = true;
        this.notifyService.notify('Đã lưu bài đăng');
      });
    }
  }
}
