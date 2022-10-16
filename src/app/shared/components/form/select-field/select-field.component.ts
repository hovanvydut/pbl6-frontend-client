import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {
  private _selectedValue: string;
  @Input()
  get selectedValue() {
    return this._selectedValue;
  }
  set selectedValue(value: string) {
    this._selectedValue = value;
    this.onValueChanged.emit({
      type: this.type,
      value: value
    });
  }
  private _items: { text: string, value: string}[];
  @Input() get items() {
    return this._items;
  };
  set items( data:  { text: string, value: string}[] ) {
    this._items = data;
    let index = data.findIndex( item => item.value === this.selectedValue)
    if( index > -1 ){
      this.selectedItem = this._items[index];
    }
  }
  @Input() type: string;
  @Input() label: string;
  @Input() customClass: string;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'fill';
  selectedItem: {text: string, value: string};

  @Output() onValueChanged = new EventEmitter<{ type: string, value: string}>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedItemChanged( item:  { text: string, value: string}) {
    this.selectedValue = item.value
  }

}
