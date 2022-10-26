import { PropertyEnum } from '@app/modules/post/enums/property.enum';
import { ItemModel } from './base.model';
export class PropertiesModel extends ItemModel {
  properties: ItemModel[];
  value: string[] = [];

  constructor(init?: Partial<PropertiesModel>) {
    super();
    Object.assign(this, init);
  }
}
