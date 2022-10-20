import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@app/core/services/common.service';
import { PostDetailFormComponent } from './../../../post/components/post-detail-form/post-detail-form.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss']
})
export class ManagePostsComponent implements OnInit {
  private postDetailFormComponent = PostDetailFormComponent;
  forceUpdate: boolean = false;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { hasUpdate: boolean },
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  onAddNewPostButtonClicked() {
    this.dialog.open(this.postDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
  }

  handleEditPost(postId: any) {
    if (postId) {
      let dialogRef = this.dialog.open(this.postDetailFormComponent, {
        width: '70vw',
        maxHeight: '90vh',
        data: { postId: postId }
      });
      dialogRef.afterClosed().pipe( finalize( () => {
        this.forceUpdate = false;
      })).subscribe(result => {
        this.forceUpdate = true;
      });
    }
  }
}
