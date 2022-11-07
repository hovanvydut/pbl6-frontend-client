import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {
  @Input() title: string = 'Tiêu đề';
  @Input() saveButton: string = 'Lưu';
  @Input() cancelButton: string = 'Hủy';
  @Input() disableSaveButton: boolean = false;

  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSaveButtonClicked() {
    this.onSave.emit();
  }
}
