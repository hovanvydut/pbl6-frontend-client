export class RegisterAccountModel {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  identityNumber: string;
  address: string;
  addressWardId: string;
  roleId: string;

  public constructor(init?: Partial<RegisterAccountModel>) {
    Object.assign(this, init);
  }
}

export class AccountModel {
  accessToken: string;
  email: string;
  id: string;
  displayName: string;

  public constructor(init?: Partial<AccountModel>) {
    Object.assign(this, init);
  }
}


export class LoginModel {
  email: string;
  password: string;

  public constructor(init?: Partial<LoginModel>) {
    Object.assign(this, init);
  }
}
