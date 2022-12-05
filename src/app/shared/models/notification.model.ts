export class NotificationBaseModel {
  id: string;
  userId: string;
  content: string;
  code: string;
  hasRead: boolean;
  createdAt: Date;

  constructor(init?: Partial<NotificationBaseModel>) {
    Object.assign(this, init);
  }
}

export class NotificationModel extends NotificationBaseModel {
    data: any;
    extraData: string;
  
    constructor(init?: Partial<NotificationModel>) {
      super();
      Object.assign(this, init);
    }
  }
  