import { NotificationCode } from "../app.enum";

export class NotificationBaseModel {
  id: string;
  userId: string;
  content: string;
  code: NotificationCode;
  hasRead: boolean;
  createdAt: Date;
  postId?: number;
  postTitle?: string;
  reviewId?: number;
  reviewContent?: string;
  bookingId?: number;
  bookingTime?: Date;
  originUserName: string;
  originUserId: string;
  originUserEmail: string;
  originUserAvatar: string;
  message: string;

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
  

  export class NotificationFilterParams {
    today: boolean;
    pageNumber: number;
    pageSize: number;
    searchValue: string;
  
    constructor(init?: Partial<NotificationFilterParams>) {
      Object.assign(this, init);
    }
  }