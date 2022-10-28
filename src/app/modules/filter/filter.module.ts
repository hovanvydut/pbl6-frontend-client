import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { SharedModule } from '@app/shared/shared.module';

const COMPONENTS = [
  FilterComponent
]
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class FilterModule { }
