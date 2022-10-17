export class BaseModel<T> {
  data: T;
  message: string;
  statusCode: number;
  success: boolean;

  constructor(init?: Partial<BaseModel<T>>) {
    Object.assign(this, init);
  }
}
