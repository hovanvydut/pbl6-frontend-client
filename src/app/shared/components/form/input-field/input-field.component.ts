import { Component, Input, OnInit } from '@angular/core';
import { InputType } from '@app/shared/app.enum';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  private _value: any;
  @Input()
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
  }
  InputType = InputType;
  @Input() icon: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() required: boolean;
  @Input() customClass: string;
  @Input() disabled: boolean = false;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'fill';

  constructor() { }

  ngOnInit(): void {
  }

}
