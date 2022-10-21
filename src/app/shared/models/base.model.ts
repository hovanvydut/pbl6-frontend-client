export class BaseModel<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;

  constructor(init?: Partial<BaseModel<T>>) {
    Object.assign(this, init);
  }
}

export class ItemBaseModel {
  id: string;
  name: string;

  constructor(init?: Partial<ItemBaseModel>) {
    Object.assign(this, init);
  }
}

export class ItemModel extends ItemBaseModel {
  displayName: string;
  constructor(init?: Partial<ItemModel>) {
    super();
    super(init);
  }
}
