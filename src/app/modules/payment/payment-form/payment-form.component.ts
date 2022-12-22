import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ItemModel } from '@app/shared/models/base.model';
import { NotifyService } from '@app/shared/services/notify.service';
import { PaymentRequest } from '../models/payment.model';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  paymentInfo = {
    ammount: new FormControl(0),
    bankCode: new FormControl(''),
    orderDes: new FormControl('')
  };
  bankCodeList: any[] = [];
  constructor(
    private paymentService: PaymentService,
    private notifyService: NotifyService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.paymentService.getBankCode().subscribe((res: any) => {
      this.bankCodeList = res.map(
        item =>
          new ItemModel({
            id: item.code,
            name: item.description
          })
      );
    });
  }

  onFinishButtonClicked() {
    if (this.paymentInfo.ammount.value <= 0) {
      this.notifyService.notify('Số tiền phải lớn hơn 0');
      return;
    }
    if (this.paymentInfo.bankCode.value === '') {
      this.notifyService.notify('Vui lòng chọn ngân hàng');
      return;
    }
    if (this.paymentInfo.orderDes.value === '') {
      this.notifyService.notify('Vui lòng nhập mô tả');
      return;
    }

    const data = new PaymentRequest({
      amount: this.paymentInfo.ammount.value,
      bankCode: this.paymentInfo.bankCode.value,
      orderDes: this.paymentInfo.orderDes.value
    });

    this.paymentService.payment(data).subscribe(res => {
      window.open(res, '_blank');
      this.notifyService.notify(
        'Đã mở trang thanh toán, kết quả thanh toán sẽ được cập nhật sau!'
      );
      setTimeout(() => {
        this.dialog.closeAll();
      }, 3000);
    });
  }

  onSelectedFieldChanged(item: any) {
    this.paymentInfo.bankCode.setValue(item.value);
  }
}
