import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
//
import { BaseService } from 'src/app/core/services/base.service';
import { StatisticParamsModel } from '../models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private baseService: BaseService) {}

  getStatistic(params: StatisticParamsModel): Observable<any> {
    const queryString =
    '?' +
    Object.keys(params)
      .map(key => {
        if (params[key] !== null) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)}=${encodeURIComponent(params[key])}`;
        }
        return '';
      })
      .join('&');
    return this.baseService.get(`post-statistic${queryString}`);
  }
}
