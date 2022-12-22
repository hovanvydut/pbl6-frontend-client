export class PaymentHistory {
  orderInfo: string;
  amount: number;
  bankCode: string;
  transactionStatus: string;
  userAccountId: number;
  userEmail: string;
  createdAt: Date;

  public constructor(init?: Partial<PaymentHistory>) {
    Object.assign(this, init);
  }
}

export class PaymentRequest {
  amount: number;
  bankCode: string;
  orderDes: string;

  public constructor(init?: Partial<PaymentRequest>) {
    Object.assign(this, init);
  }
}

export class BankCode {
  code: string;
  description: string;
  public constructor(init?: Partial<BankCode>) {
    Object.assign(this, init);
  }
}
