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
