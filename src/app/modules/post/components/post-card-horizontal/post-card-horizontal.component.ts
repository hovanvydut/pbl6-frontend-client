import { Component, Input, OnInit } from '@angular/core';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { PostService } from '@app/modules/post/services/post.service';
import { NotifyService } from '@app/shared/services/notify.service';
@Component({
  selector: 'app-post-card-horizontal',
  templateUrl: './post-card-horizontal.component.html',
  styleUrls: ['./post-card-horizontal.component.scss']
})
export class PostCardHorizontalComponent implements OnInit {

  @Input() post: any;

  ENDPOINTS = ENDPOINTS;

  constructor(private postService: PostService,
    private notifyService: NotifyService) { }

  ngOnInit() {
  }

  onBookmarkButtonClicked() {
    if( this.post.isBookmarked ) {
      this.postService.removeBookmark(this.post.id).subscribe(
        () => {
          this.post.isBookmarked = false;
          this.notifyService.notify('Đã bỏ lưu bài đăng');
        }
      );
    } else {
      this.postService.addBookmark(this.post.id).subscribe(
        () => {
          this.post.isBookmarked = true;
          this.notifyService.notify('Đã lưu bài đăng');
        }
      );
    }
  }
}
