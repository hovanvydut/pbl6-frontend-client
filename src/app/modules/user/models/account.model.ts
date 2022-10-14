export class AccountModel {
	id: string;
	name: string;
	companyName: string;
	email: string;
	city: string;
	address: string;
	personalPhoneNumber: string;
	identifierNumber: string;
	companyEmail: string;
	avatar: any;
	avatarImg: any;
	timezone: string;
	country: string;
	// For UI
	isChanged: boolean;
	isSaving: boolean;

	public constructor(init?: Partial<AccountModel>) {
		Object.assign(this, init);
	}
}

export class RegisteredAccountModel {
	name: string;
	companyName: string;
	email: string;
	password: string;
	confirmPassword: string;
	isSaving: boolean;

	public constructor(init?: Partial<RegisteredAccountModel>) {
		Object.assign(this, init);
	}
}

export class ActivateAccountModel {
	userId: string;
	token: string;

	public constructor(init?: Partial<ActivateAccountModel>) {
		Object.assign(this, init);
	}
}
