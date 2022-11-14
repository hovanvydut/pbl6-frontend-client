import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentFormComponent } from '../payment-form/payment-form.component';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onRechargeButtonClicked() {
    let dialogRef = this.dialog.open(PaymentFormComponent, {
      width: '99vw',
      maxHeight: '99vh',
      data: {
        postId: 1
      }
    });
  }

}
