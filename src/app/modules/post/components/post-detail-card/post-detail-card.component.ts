import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from '@app/core/services/base.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { PostBaseModel } from '../../models/post.model';
import { BookmarkService } from '../../services/bookmark.service';
import { ReviewService } from '../../services/review.service';
import { PostBookingComponent } from '../post-booking/post-booking.component';
import { PostReviewComponent } from '../post-review/post-review.component';

@Component({
  selector: 'app-post-detail-card',
  templateUrl: './post-detail-card.component.html',
  styleUrls: ['./post-detail-card.component.scss']
})
export class PostDetailCardComponent implements OnInit {
  @Input() post: PostBaseModel;
  completeIconSet = completeIconSet;
  isMyPost: boolean = false;
  reviews: [];
  constructor( private dialog: MatDialog, private reviewSerice: ReviewService,
    private baseService: BaseService,
    private bookmarkService: BookmarkService,
    private notifyService: NotifyService) { }

  ngOnInit() {
    this.getReviews();
    if(this.baseService.currentUser.id === this.post.authorInfo.id){
      this.isMyPost = true;
    }
  }

  getReviews() {
    this.reviewSerice.getReviews(this.post.id).subscribe(res => {
      this.reviews = res.records;
      console.log(res);
    });
  }

  onReviewPostButtonClicked() {
    let dialogRef = this.dialog.open( PostReviewComponent, {
      width: '99vw',
      maxHeight: '99vh',
      data: {
        postId: this.post.id
      }
    });

    dialogRef.afterClosed().subscribe( (data) => {
      this.getReviews();
    })
  }

  onBookingCalendarButtonClicked() {
    let dialogRef = this.dialog.open(PostBookingComponent, {
      width: '99vw',
      maxHeight: '99vh',
      data: {
        post: this.post,
      }
    });
  }

  onBookmarkButtonClicked() {
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
