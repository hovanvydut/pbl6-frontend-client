import { ProfileBaseModel } from '@app/modules/profile/models/profile.model';
import { ItemBaseModel, TimeBaseModel } from '@app/shared/models/base.model';
import { AddressModel } from './../../../shared/models/address.model';
export class PostBaseModel extends TimeBaseModel{
  id: string;
  title: string;
  description: string;
  address: string;
  fullAddress: AddressModel;
  addressWardId: string;
  categoryId: string;
  area: number;
  price: number;
  limitTenant: number;
  prePaidPrice: number;
  properties: any[] = [];
  medias: any[] = [];
  category: ItemBaseModel;
  isBookmarked: boolean = false;
  authorId: string = '0';
  authorInfo: ProfileBaseModel;
  rating: number = 0;
  totalReview: number = 3;

  public constructor(init?: Partial<PostRequestModel>) {
    super();
    Object.assign(this, init);
  }
}

export class PostRequestModel extends PostBaseModel {

  public constructor(init?: Partial<PostRequestModel>) {
    super();
    Object.assign(this, init);
  }
}

export class Category {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;

  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}

export class Review {
  id: number;
  name: string;
  rating: number;
  comment: string;

  public constructor(init?: Partial<Review>) {
    Object.assign(this, init);
  }
}


export class QueryParams {
  pageNumber: number;
  pageSize: number;

  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  addressWardId?: string;
  categoryId?: string;
  searchValue?: string;

  properties: string[] = [];

  public constructor(init?: Partial<QueryParams>) {
    Object.assign(this, init);
  }
}
