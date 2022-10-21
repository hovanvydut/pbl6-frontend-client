import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@app/core/services/common.service';
import { PostDetailFormComponent } from './../../../post/components/post-detail-form/post-detail-form.component';
import { finalize } from 'rxjs';
import { PostTableComponent } from '@app/modules/post/components/post-table/post-table.component';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss']
})
export class ManagePostsComponent implements OnInit {
  @ViewChild('postTable') postTableComponent: PostTableComponent;
  private postDetailFormComponent = PostDetailFormComponent;
  forceUpdate: boolean = false;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { hasUpdate: boolean },
    private commonService: CommonService
  ) {}

  ngOnInit(): void {}

  onAddNewPostButtonClicked() {
    let dialogRef = this.dialog.open(this.postDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.postTableComponent.getPosts();
    });
  }

  handleEditPost(postId: any) {
    if (postId) {
      let dialogRef = this.dialog.open(this.postDetailFormComponent, {
        width: '70vw',
        maxHeight: '90vh',
        data: { postId: postId }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.postTableComponent.getPosts();
      });
    }
  }
}
