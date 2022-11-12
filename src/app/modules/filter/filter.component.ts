import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { ItemModel } from '@app/shared/models/base.model';
import { PropertiesModel } from '@app/shared/models/property.model';
import { QueryParams } from '../post/models/post.model';
import { CommonService } from '@app/core/services/common.service';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  private _addressWardId: string;
  @Input() get addressWardId() {
    return this._addressWardId;
  }
  set addressWardId(value) {
    this._addressWardId = value;
    if (value) {
      this.queryParams.addressWardId = value;
      this.filterService.setQueryParams(this.queryParams);
    }
  }
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
    maxPrice: new FormControl(30000000),
    minPrice: new FormControl(0),
    searchValue: new FormControl('')
  };

  private subscription: Subscription = new Subscription();
  private filterParams$: Subject<void> = new Subject();

  constructor(
    private commonService: CommonService,
    private filterService: FilterService,
    private router: Router
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
    if (params.value) {
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

  onClearFilterButtonClicked() {
    this.properties.forEach(property => {
      property.value = [];
    });
    this.filterParams = {
      maxArea: new FormControl(100),
      minArea: new FormControl(0),
      maxPrice: new FormControl(30000000),
      minPrice: new FormControl(0),
      searchValue: new FormControl('')
    };
    this.filterService.setQueryParams(this.queryParams);
  }

  onFilterButtonClicked() {
    this.queryParams.maxArea = this.filterParams.maxArea.value;
    this.queryParams.minArea = this.filterParams.minArea.value;
    this.queryParams.maxPrice = this.filterParams.maxPrice.value;
    this.queryParams.minPrice = this.filterParams.minPrice.value;
    this.queryParams.properties = [];
    this.properties.forEach(property => {
      if (property.value.length > 0) {
        this.queryParams.properties.push(property.id as string);
      }
    });
    this.filterService.setQueryParams(this.queryParams);
    this.onValueChanged();
  }

  onValueChanged() {
    this.filterParams$.next();
    if (this.router.url !== ENDPOINTS.POSTS_FILTER) {
      this.router.navigateByUrl(ENDPOINTS.POSTS_FILTER).then();
    }
  }

  handleSliderChanged(value: { max: number; min: number }, type: string) {
    switch (type) {
      case 'area':
        this.filterParams.maxArea.setValue(value.max);
        this.filterParams.minArea.setValue(value.min);
        break;
      case 'price':
        this.filterParams.maxPrice.setValue(value.max);
        this.filterParams.minPrice.setValue(value.min);
        break;
      default:
        break;
    }
  }
}
