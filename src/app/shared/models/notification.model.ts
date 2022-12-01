import { NotificationCode } from "../app.enum";

export class NotificationBaseModel {
  id: string;
  userId: string;
  content: string;
  code: NotificationCode;
  hasRead: boolean;
  createdAt: Date;
  postId?: number;
  reviewId?: number;
  reviewContent?: string;
  bookingId?: number;
  originUserName: string;
  originUserId: string;
  originUserEmail: string;

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
  