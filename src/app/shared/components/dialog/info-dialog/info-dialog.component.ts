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

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  @Input() title: string = 'Tiêu đề';
  @Input() description: string = 'Mô tả';
  @Input() image: string = 'assets/images/default/message.png';
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
    }
  }
}