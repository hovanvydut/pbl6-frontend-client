import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services/common.service';
import { ItemModel } from '@app/shared/models/base.model';
import { PropertiesModel } from '@app/shared/models/property.model';
import { PropertyEnum } from '../post/enums/property.enum';
import { QueryParams } from '../post/models/post.model';
import { FormControl } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { FilterService } from './filter.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ENDPOINTS } from '@app/shared/utilities';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  roomTypes: ItemModel[] = [
    new ItemModel({
      id: null,
      name: 'Tất cả'
    })
  ];
  properties: PropertiesModel[];
  selectedProperties: ItemModel[] = [];

  queryParams: QueryParams;

  filterParams: {
    maxArea: FormControl;
    minArea: FormControl;
    maxPrice: FormControl;
    minPrice: FormControl;
    searchValue: FormControl;
  } = {
    maxArea: new FormControl(100),
    minArea: new FormControl(0),
    maxPrice: new FormControl(1000000),
    minPrice: new FormControl(0),
    searchValue: new FormControl('')
  };

  private subscription: Subscription = new Subscription();
  private filterParams$: Subject<void> = new Subject();

  constructor(
    private commonService: CommonService,
    private filterService: FilterService,
    private router: Router,
  ) {
    this.subscription.add(
      this.filterService._queryParams.subscribe(params => {
        this.queryParams = params;
        this.filterParams.maxArea.setValue(params.maxArea);
        this.filterParams.minArea.setValue(params.minArea);
        this.filterParams.maxPrice.setValue(params.maxPrice);
        this.filterParams.minPrice.setValue(params.minPrice);
        this.filterParams.searchValue.setValue(params.searchValue);
      })
    );

    this.filterParams$.subscribe(() => {
      this.filterService.setQueryParams(this.queryParams);
    });
  }

  ngOnInit() {
    this.getRoomCategory();
    this.getProperties();
  }

  getRoomCategory() {
    this.commonService.getRoomCategory().subscribe(val => {
      this.roomTypes = [...this.roomTypes, ...val];
    });
  }

  getProperties() {
    this.commonService.getProperties().subscribe(res => {
      this.properties = res;
      this.properties.forEach(property => {
        property.value = [];
      });
    });
  }

  onSelectedFieldChanged(params) {
    // check if the property is already selected
    if (params.value) {
      //  update properties value
      this.properties.findIndex(property => {
        if (property.id === params.type) {
          property.value = params.value;
        }
      });
    }
  }

  onCategorySelected(id: string) {
    this.queryParams.categoryId = id;
    this.onValueChanged();
  }

  onFilterButtonClicked() {
    this.queryParams.maxArea = this.filterParams.maxArea.value;
    this.queryParams.minArea = this.filterParams.minArea.value;
    this.queryParams.maxPrice = this.filterParams.maxPrice.value;
    this.queryParams.minPrice = this.filterParams.minPrice.value;
    this.queryParams.properties = [];
    console.log(this.properties)
    this.properties.forEach(property => {
      if (property.value.length > 0) {
        this.queryParams.properties.push(property.id as string);
      }
    });
    this.filterService.setQueryParams(this.queryParams);
    this.onValueChanged();
  }

  formatLabel(value: number) {
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'tr';
    }

    return value;
  }

  onValueChanged() {
    this.filterParams$.next();
    if (this.router.url !== ENDPOINTS.POSTS_FILTER) {
      this.router.navigateByUrl(ENDPOINTS.POSTS_FILTER).then();
    }
  }
}
