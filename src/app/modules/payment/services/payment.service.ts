import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private baseService: BaseService) { }


  getBankCode() {
    return this.baseService.get<any[]>('payment/bank-code');
  }

  payment(data: any) {
    return this.baseService.post<any>('payment', data);
  }
}
