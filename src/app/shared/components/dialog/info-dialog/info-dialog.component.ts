import { Dialog } from '@angular/cdk/dialog';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DEFAULT_IMAGES } from '@app/shared/app.constants';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  @Input() title: string = 'Tiêu đề';
  @Input() description: string = 'Mô tả';
  @Input() image: string = DEFAULT_IMAGES.message;
  @Input() cancelButton: string = 'Đóng';

  

  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; description: string; image: string },
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.title = this.data.title;
      this.description = this.data.description;
      this.image = this.data.image ? this.data.image : this.image;
    }
  }
}