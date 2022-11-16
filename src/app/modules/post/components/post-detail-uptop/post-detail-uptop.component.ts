import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { settingEnum } from '@app/modules/setting/enums/setting-key.enum';
import { SettingService } from '@app/modules/setting/services';
import { NotifyService } from '@app/shared/services/notify.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail-uptop',
  templateUrl: './post-detail-uptop.component.html',
  styleUrls: ['./post-detail-uptop.component.scss']
})
export class PostDetailUptopComponent implements OnInit {
  detailUptop: {
    id: number;
    title: string;
    slug?: any;
    address: string;
    startTime: Date;
    endTime: Date;
    days: number;
  } = {
    id: null,
    title: null,
    slug: null,
    address: null,
    startTime: new Date(),
    endTime: new Date(),
    days: 0
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { postId: string },
    public dialog: MatDialog,
    private postService: PostService,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.postService.detailUptopPost(this.data.postId).subscribe(
      data => {
        this.detailUptop = data;
        this.detailUptop.startTime = new Date(this.detailUptop.startTime);
        this.detailUptop.endTime = new Date(this.detailUptop.endTime);
        this.detailUptop.days = this.diffDays(
          this.detailUptop.startTime,
          this.detailUptop.endTime
        );
      },
      e => {
        this.notifyService.notify(e);
      }
    );
  }

  diffDays(startDay, endDay) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((startDay - endDay) / oneDay));
    return diffDays;
  }
}
