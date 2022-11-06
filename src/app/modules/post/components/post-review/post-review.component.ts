import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss']
})
export class PostReviewComponent implements OnInit {
  selectedRate: number = 0;
  content: FormControl = new FormControl('', Validators.required);
  previews: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { postId: string; addedReview},
    private notifyService: NotifyService,
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onStarClicked(rate: number) {
    this.selectedRate = rate;
  }

  onFileSelected(url: string) {
    this.previews.push(url);
  }

  onReviewSubmit() {
    if (!this.content.valid || this.selectedRate === 0 || this.previews.length === 0) {
      this.notifyService.notify('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const data = {
      content: this.content.getRawValue(),
      medias: this.previews.map(url => {
        return {
          url: url
        };
      }),
      rating: this.selectedRate
    };

    this.reviewService.postReview(this.data.postId, data).subscribe(res => {
      this.data.addedReview = true;
      this.dialog.closeAll();
    }, err => {
      this.notifyService.notify(err);
    });
  }
}
