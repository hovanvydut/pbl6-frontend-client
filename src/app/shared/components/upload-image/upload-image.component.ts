import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonService } from '@app/core/services/common.service';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Output() onImageUploaded: EventEmitter<string> = new EventEmitter();
  constructor(private commonService: CommonService, private notifyService: NotifyService ) { }

  ngOnInit(): void {
  }

  onFileSelected(e) {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles[0]) {
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i].size > 2097152) {
          this.notifyService.notify('File size must be smaller than 2 MB');
          return;
        }
        this.commonService.uploadImage(selectedFiles[i]).subscribe(res => {
          this.onImageUploaded.emit(res);
        });
      }
    }
  }
}
