import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QueryParams } from '../post/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  queryParams: QueryParams = new QueryParams({
    categoryId: null,
    maxArea: 500,
    minArea: 1,
    maxPrice: 10000000,
    minPrice: 0,
    properties: [],
    searchValue: '',
    pageNumber: 0,
    pageSize: 12
  })

  _queryParams: BehaviorSubject<QueryParams> = new BehaviorSubject<QueryParams>(this.queryParams);

  setQueryParams(value: QueryParams) {
    this._queryParams.next(value);
  }

  constructor() {
  }
}
