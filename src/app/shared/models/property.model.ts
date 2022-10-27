import { ItemModel } from './base.model';
export class PropertiesModel extends ItemModel {
  properties: ItemModel[];
  value: any[] = [];

  constructor(init?: Partial<PropertiesModel>) {
    super();
    Object.assign(this, init);
  }
}
