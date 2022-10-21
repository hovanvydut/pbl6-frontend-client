import { ItemBaseModel } from "./base.model";

export class AddressModel {
  ward: ItemBaseModel;
  district: ItemBaseModel;
  province: ItemBaseModel;

  constructor(init?: Partial<AddressModel>) {
    Object.assign(this, init);
  }
}
