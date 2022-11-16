import { SettingService } from './../../../setting/services/setting.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotifyService } from '@app/shared/services/notify.service';
import { PostService } from '../../services/post.service';
import { settingEnum } from '@app/modules/setting/enums/setting-key.enum';

@Component({
  selector: 'app-post-uptop',
  templateUrl: './post-uptop.component.html',
  styleUrls: ['./post-uptop.component.scss']
})
export class PostUptopComponent implements OnInit {
  days: number = 1;
  fee: number = 0;
  startTime: Date = new Date();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: any },
    public dialog: MatDialog,
    private postService: PostService,
    private notifyService: NotifyService,
    private settingService: SettingService
  ) {}

  ngOnInit() {
    this.settingService
      .getSettingByKey(settingEnum.UptopPrice)
      .subscribe(data => {
        this.fee = data.value;
      });
  }

  onUptopPostButtonClicked() {
    this.startTime.setHours(this.startTime.getHours() + 1);
    
    const data = {
      postId: this.data.post.id,
      days: this.days,
      startTime: this.startTime.toISOString()
    }
    if (this.data.post.id) {
      this.postService.upTopPost(data).subscribe(
        data => {
          this.notifyService.notify('Đã đẩy lên tin ưu tiên');
        },
        e => {
          this.notifyService.notify(e);
        }
      );
    }
  }
}
