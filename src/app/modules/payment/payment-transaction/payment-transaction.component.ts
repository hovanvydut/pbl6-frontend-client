import { map } from 'rxjs';
import { transition } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { QueryParams } from '@app/modules/post/models/post.model';
import { PaymentService } from '../services/payment.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-transaction',
  templateUrl: './payment-transaction.component.html',
  styleUrls: ['./payment-transaction.component.scss']
})
export class PaymentTransactionComponent implements OnInit {
  transactions: any[];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 1,
    pageSize: 10,
  });
  selectedTab = '1';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  totalPaymentTransactions = 0;

  constructor(private paymentSerice: PaymentService) {}

  ngOnInit() {
    this.getPaymentTransaction();
  }

  getPaymentTransaction() {
    this.paymentSerice
      .getPaymentTransaction(this.queryParams)
      .subscribe(res => {
        this.transactions = res.records.map( _ => {
          const orderInfo = _.orderInfo.split('|');
          _.code = orderInfo[0];
          _.description = orderInfo[1];
          return _;
        });
      });
  }

  pageChangeEvent(event: { pageIndex: number; pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.getPaymentTransaction();
  }

  onDateRangeChanged() {
    this.queryParams.fromDate = this.range.value.start.toISOString();
    this.queryParams.toDate = this.range.value.end.toISOString();
    this.getPaymentTransaction();
  }

  onDateRangeReset() {
    this.range.reset();
    this.queryParams.fromDate = null;
    this.queryParams.toDate = null;
    this.getPaymentTransaction();
  }

  onTabChanged() {
    this.getPaymentTransaction();
  }
}
