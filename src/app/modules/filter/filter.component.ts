import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services/common.service';
import { ItemModel } from '@app/shared/models/base.model';
import { PropertiesModel } from '@app/shared/models/property.model';
import { PropertyEnum } from '../post/enums/property.enum';
import { QueryParams } from '../post/models/post.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  roomTypes: ItemModel[];
  properties: PropertiesModel[];

  queryParams: QueryParams = new QueryParams({
    categoryId: '1',
    maxArea: 100,
    minArea: 0,
    maxPrice: 1000000,
    minPrice: 0,
  })

  filterParams = {
    maxArea: new FormControl(100),
    minArea: new FormControl(0),
    maxPrice: new FormControl(20000000),
    minPrice: new FormControl(0),
  }

  constructor(private commonService: CommonService) {
    this.getRoomCategory();
    this.getProperties();
  }

  ngOnInit() {
  }

  getRoomCategory() {
    this.commonService.getRoomCategory().subscribe(val => {
      this.roomTypes = val;
    });
  }

  getProperties() {
    this.commonService.getProperties().subscribe(res => {
      this.properties = res;
    });
  }

  onSelectedFieldChanged($event) {
    console.log(this.properties);
  }

  onCategorySelected(id: string) {
    this.queryParams.categoryId = id;
  }

  onFilterButtonClicked() {
    this.queryParams.maxArea = this.filterParams.maxArea.value;
    this.queryParams.minArea = this.filterParams.minArea.value;
    this.queryParams.maxPrice = this.filterParams.maxPrice.value;
    this.queryParams.minPrice = this.filterParams.minPrice.value;
    console.log(this.queryParams);

  }

  formatLabel(value: number) {
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'tr';
    }

    return value;
  }
}
