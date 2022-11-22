import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { QueryParams } from '@app/modules/post/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private baseService: BaseService) {}

  getBankCode() {
    return this.baseService.get<any[]>('payment/bank-code');
  }

  payment(data: any) {
    return this.baseService.post<any>('payment', data);
  }

  getPaymentTransaction(params: QueryParams) {
    const queryString =
      '?' +
      Object.keys(params)
        .map(key => {
          if (params[key] !== null) {
            return `${key.charAt(0).toUpperCase() +
              key.slice(1)}=${encodeURIComponent(params[key])}`;
          }
          return '';
        })
        .join('&');
    return this.baseService.get<any>(`payment/history/personal${queryString}`);
  }

  getRechargeTransaction(params: QueryParams) {
    const queryString =
      '?' +
      Object.keys(params)
        .map(key => {
          if (params[key] !== null) {
            return `${key.charAt(0).toUpperCase() +
              key.slice(1)}=${encodeURIComponent(params[key])}`;
          }
          return '';
        })
        .join('&');
    return this.baseService.get<any>(`payment-history/personal${queryString}`);
  }

}
