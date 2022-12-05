import { Component, OnInit } from '@angular/core';
import { QueryParams } from '@app/modules/post/models/post.model';
import { PaymentService } from '../services/payment.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HistoryTransactionTypes } from '../const/transaction.const';
import { TransactionStatus, TransactionType } from '../enums/transaction.enum';
import { PostActionType } from '@app/modules/post/enums/post.enum';

@Component({
  selector: 'app-payment-transaction',
  templateUrl: './payment-transaction.component.html',
  styleUrls: ['./payment-transaction.component.scss']
})
export class PaymentTransactionComponent implements OnInit {
  transactions: any[];
  queryParams: QueryParams = new QueryParams({
    pageNumber: 0,
    pageSize: 10
  });
  TransactionType = TransactionType;
  TransactionStatus = TransactionStatus;
  PostActionType = PostActionType;
  tabs = HistoryTransactionTypes;

  selectedTab = TransactionType.Recharge;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });
  totalPaymentTransactions = 0;

  constructor(private paymentSerice: PaymentService) {}

  ngOnInit() {
    this.getRechargeTransaction();
  }

  getPaymentTransaction() {
    this.paymentSerice
      .getRechargeTransaction(this.queryParams)
      .subscribe(res => {
        this.transactions = res.records.map(_ => {
          _.codeType = PostActionType[_.paymentType];
          _.code = _.paymentCode;
          _.transactionStatus = TransactionStatus.Success;
          return _;
        });
        this.totalPaymentTransactions = res.totalRecords;
      });
  }

  getRechargeTransaction() {
    this.paymentSerice
      .getPaymentTransaction(this.queryParams)
      .subscribe(res => {
        this.transactions = res.records.map(_ => {
          const orderInfo = _.orderInfo.split('|');
          _.code = orderInfo[0];
          _.description =
            orderInfo[1].trim().length > 0 ? orderInfo[1] : 'Không có mô tả';
          _.codeType = _.bankCode;
          return _;
        });
        this.totalPaymentTransactions = res.totalRecords;
      });
  }

  pageChangeEvent(event: { pageIndex: number; pageSize: number }) {
    this.queryParams.pageSize = event.pageSize;
    this.queryParams.pageNumber = event.pageIndex
    this.getTransactionHistory();
  }

  onDateRangeChanged() {
    this.queryParams.fromDate = this.range.value.start.toISOString();
    this.queryParams.toDate = this.range.value.end.toISOString();
    this.getTransactionHistory();
  }

  onDateRangeReset() {
    this.range.reset();
    this.queryParams.fromDate = null;
    this.queryParams.toDate = null;
    this.getTransactionHistory();
  }

  onTabChanged() {
    this.queryParams.searchValue = '';
    this.getTransactionHistory();
  }

  getTransactionHistory() {
    if (this.selectedTab === TransactionType.Payment) {
      this.getPaymentTransaction();
    } else {
      this.getRechargeTransaction();
    }
  }
}
