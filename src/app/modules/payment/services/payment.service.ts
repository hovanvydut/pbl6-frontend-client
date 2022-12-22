import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';
import { QueryParams } from '@app/modules/post/models/post.model';
import { BankCode, PaymentRequest } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private baseService: BaseService) {}

  getBankCode() {
    return this.baseService.get<BankCode[]>('payment/bank-code');
  }

  payment(data: PaymentRequest) {
    return this.baseService.post<string>('payment', data);
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
