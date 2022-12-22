import { moduleType } from '../app.enum';

export class MenuItem {
  type?: moduleType;
  icon: string;
  icon_active?: string;
  name: string;
  link: string;
  isVisible: boolean;

  constructor(init?: Partial<MenuItem>) {
    Object.assign(this, init);
  }
}
