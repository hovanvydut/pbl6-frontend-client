import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@app/core/services/common.service';
import { PostDetailFormComponent } from './../../../post/components/post-detail-form/post-detail-form.component';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss']
})
export class ManagePostsComponent implements OnInit {
  private postDetailFormComponent = PostDetailFormComponent;
  dialogRef: any;
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { hasUpdate: boolean },
    private commonService: CommonService) {}

  ngOnInit(): void {
  }

  onAddNewPostButtonClicked() {
    this.dialogRef = this.dialog.open(this.postDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh',
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  handleEditPost(postId: any) {
    if (postId) {
      this.dialog.open(this.postDetailFormComponent, {
        width: '70vw',
        maxHeight: '90vh',
        data: { postId: postId }
      });
    }
  }
}
