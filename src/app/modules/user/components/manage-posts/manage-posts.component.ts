import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '@app/core/services/common.service';
import { PostGeneralService } from '../../services/post-general.service';
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
    private postGeneralService: PostGeneralService,
    private commonService: CommonService) {}

  ngOnInit(): void {
    // this.postGeneralService.getPostProperty().subscribe(res => {
    //   console.log(res);
    // });
    // this.commonService.getProvince().subscribe(res => {
    //   console.log(res);
    // });
    // this.commonService.getDistrict(1).subscribe(res => {
    //   console.log(res);
    // });
  }

  onAddNewPostButtonClicked() {
    this.dialogRef = this.dialog.open(this.postDetailFormComponent, {
      width: '70vw',
      maxHeight: '90vh'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
    console.log('Add new post button clicked');
  }

  onEditPostButtonClicked(recordId: any) {
    if (recordId) {
      this.dialog.open(this.postDetailFormComponent, {
        data: { recordId: recordId }
      });
    }
  }
}
