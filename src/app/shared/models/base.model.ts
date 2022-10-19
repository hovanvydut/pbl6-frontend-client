export class BaseModel<T> {
  data: T;
  Message: string;
  statusCode: number;
  success: boolean;

  constructor(init?: Partial<BaseModel<T>>) {
    Object.assign(this, init);
  }
}
