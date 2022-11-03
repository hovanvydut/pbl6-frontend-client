import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { PostBaseModel } from '../../models/post.model';
import { ReviewService } from '../../services/review.service';
import { PostReviewComponent } from '../post-review/post-review.component';

@Component({
  selector: 'app-post-detail-card',
  templateUrl: './post-detail-card.component.html',
  styleUrls: ['./post-detail-card.component.css']
})
export class PostDetailCardComponent implements OnInit {
  @Input() post: PostBaseModel;
  completeIconSet = completeIconSet;
  reviews: [];
  constructor( private dialog: MatDialog, private reviewSerice: ReviewService) { }

  ngOnInit() {
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
  }
}
