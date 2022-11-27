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

export class NotificationResponseModel extends NotificationBaseModel {
  extraData: string;

  constructor(init?: Partial<NotificationResponseModel>) {
    super();
    Object.assign(this, init);
  }
}


export class NotificationVM extends NotificationBaseModel {
    data: any;
  
    constructor(init?: Partial<NotificationVM>) {
      super();
      Object.assign(this, init);
    }
  }
  