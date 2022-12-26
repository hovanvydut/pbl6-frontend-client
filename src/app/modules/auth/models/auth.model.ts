import { Role } from "@app/shared/app.enum";

export class AuthModel {
  email: string;
  password: string;
}

export class RegisterAccountModel extends AuthModel {
  displayName: string;
  phoneNumber: string;
  identityNumber: string;
  address: string;
  addressWardId: string;
  roleId: number;

  public constructor(init?: Partial<RegisterAccountModel>) {
    super();
    Object.assign(this, init);
  }
}

export class LoginModel extends AuthModel {
  public constructor(init?: Partial<LoginModel>) {
    super();
    Object.assign(this, init);
  }
}

export class AccountModel {
  accessToken: string;
  email: string;
  id: string;
  displayName: string;
  roleId: Role;

  public constructor(init?: Partial<AccountModel>) {
    Object.assign(this, init);
  }
}

export class RegisterResponseModel {
  email: string;
  roleName: string;

  public constructor(init?: Partial<RegisterResponseModel>) {
    Object.assign(this, init);
  }
}

export class RecoverPasswordModel {
  userId: number;
  code: string;
  newPassword: string;

  public constructor(init?: Partial<RecoverPasswordModel>) {
    Object.assign(this, init);
  }
}


export class RoleModel {
  id: number;
  name: string;
  description: string;

  public constructor(init?: Partial<RoleModel>) {
    Object.assign(this, init);
  }
}