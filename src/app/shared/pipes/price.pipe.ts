import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  constructor(private numberPipe: DecimalPipe) {}

  transform(value: number, ...args: unknown[]): string {
    if( value < 1000000) {
      return this.numberPipe.transform(value, '1.0-0') + 'đ';
    } else {
      return this.numberPipe.transform(value / 1000000, '1.0-2') + ' Triệu';
    }
    return null;
  }

}
