import { ViewportScroller } from '@angular/common';
import { outputAst } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { BaseService } from '@app/core/services/base.service';
import { CommonService } from '@app/core/services/common.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { ENDPOINTS } from '@app/shared/utilities';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { PostBaseModel } from '../../models/post.model';
import { BookmarkService } from '../../services/bookmark.service';
import { ReviewService } from '../../services/review.service';
import { PostBookingComponent } from '../post-booking/post-booking.component';
import { PostReviewComponent } from '../post-review/post-review.component';
import { PostSwiperComponent } from '../post-swiper/post-swiper.component';

@Component({
  selector: 'app-post-detail-card',
  templateUrl: './post-detail-card.component.html',
  styleUrls: ['./post-detail-card.component.scss']
})
export class PostDetailCardComponent implements OnInit, AfterViewChecked {
  @Input() post: PostBaseModel;
  @Output() onAddReview = new EventEmitter<void>();
  completeIconSet = completeIconSet;
  isMyPost: boolean = false;
  reviews: [];
  reviewId: string;
  isScrollDone: boolean = false;

  constructor(
    private dialog: MatDialog,
    private reviewSerice: ReviewService,
    private baseService: BaseService,
    private bookmarkService: BookmarkService,
    private notifyService: NotifyService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getReviews();
    if (this.baseService?.currentUser?.id === this.post?.authorInfo.id) {
      this.isMyPost = true;
      this.notifyService.notify('Bạn đang xem bài đăng của mình');
    }
    this.reviewId = this.route.snapshot.queryParamMap.get('reviewId');
  }

  ngAfterViewChecked() {
    if (!this.isScrollDone && this.reviewId) {
      let el = document.getElementById(this.reviewId);
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        this.isScrollDone = true;
      }
    }
  }

  getReviews() {
    this.reviewSerice.getReviews(this.post.id).subscribe(res => {
      this.reviews = res.records;
    });
  }

  onReviewPostButtonClicked() {
    if (!this.commonService.validateAuthentication()) {
      this.notifyService.notify('Đăng nhập để đánh giá bài viết');
      return;
    }
    let dialogRef = this.dialog.open(PostReviewComponent, {
      width: '99vw',
      maxHeight: '99vh',
      data: {
        postId: this.post.id
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.onAddReview.emit();
      this.getReviews();
    });
  }

  onBookingCalendarButtonClicked() {
    if (!this.commonService.validateAuthentication()) {
      this.notifyService.notify('Đăng nhập để đặt lịch');
      return;
    }
    let dialogRef = this.dialog.open(PostBookingComponent, {
      width: '99vw',
      maxHeight: '99vh',
      data: {
        post: this.post
      }
    });
  }

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

  viewFullScreen(medias: string[]) {
    if (medias.length > 0) {
      let dialogRef = this.dialog.open(PostSwiperComponent, {
        width: '99vw',
        maxHeight: '99vh',
        data: {
          images: medias
        }
      });
    }
  }

  onEditPostButtonClicked(id: string) {
    this.router.navigate([ENDPOINTS.LANDLOR_MANAGE_POSTS], {
      queryParams: { postId: id }
    });
  }
}
