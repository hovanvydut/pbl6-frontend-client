import { Component, Input, OnInit } from '@angular/core';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { PostBaseModel } from '../../models/post.model';
import { NotifyService } from '@app/shared/services/notify.service';
import { BookmarkService } from '../../services/bookmark.service';
import { DEFAULT_IMAGES } from '@app/shared/app.constants';
import { CommonService } from '@app/core/services/common.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: PostBaseModel;
  DEFAULT_IMAGES = DEFAULT_IMAGES;
  ENDPOINTS = ENDPOINTS;

  constructor(private bookmarkService: BookmarkService,
    private notifyService: NotifyService,
    private commonService: CommonService) { }

  ngOnInit() {
  }

  onBookmarkButtonClicked() {
    if (!this.commonService.validateAuthentication()) {
      this.notifyService.notify('Đăng nhập để lưu bài viết');
      return;
    }
    if( this.post.isBookmarked ) {
      this.bookmarkService.removeBookmark(this.post.id).subscribe(
        () => {
          this.post.isBookmarked = false;
          this.notifyService.notify('Đã bỏ lưu bài đăng');
        }
      );
    } else {
      this.bookmarkService.addBookmark(this.post.id).subscribe(
        () => {
          this.post.isBookmarked = true;
          this.notifyService.notify('Đã lưu bài đăng');
        }
      );
    }
  }
}
