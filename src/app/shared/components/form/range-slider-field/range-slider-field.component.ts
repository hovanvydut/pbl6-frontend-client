import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  Options,
  LabelType,
  ChangeContext
} from '@angular-slider/ngx-slider';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-range-slider-field',
  templateUrl: './range-slider-field.component.html',
  styleUrls: ['./range-slider-field.component.scss']
})
export class RangeSliderFieldComponent implements OnInit {
  _maxValue: number = 100;
  @Input() set maxValue(value: number) {
    this._maxValue = value;
  }
  get maxValue(): number {
    return this._maxValue;
  }
  _minValue: number = 0;
  @Input() set minValue(value: number) {
    this._minValue = value;
  }
  get minValue(): number {
    return this._minValue;
  }
  @Input() floor;
  @Input() ceil;
  @Input() unit: string = 'tr';

  @Output() onValueChanged = new EventEmitter<{
    max: number;
    min: number;
  }>();

  options: Options;

  constructor(private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {
    this.options = {
      floor: this.floor,
      ceil: this.ceil,
      translate: (value: number, label: LabelType): string => {
        if( this.unit === 'tr' ) {
          return (this.decimalPipe.transform(value / 1000, '1.0-0') ) + 'tr';
        }
        if (this.unit === 'm2') {
          return this.decimalPipe.transform(value, '1.0-0') + 'm2';
        }
        return value.toString();
      },
      showSelectionBar: true,
      selectionBarGradient: {
        from: '#B8E8FC',
        to: '#277BC0'
      }
    }
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.onValueChanged.emit({
      max: changeContext.highValue,
      min: changeContext.value
    });
  }
}
