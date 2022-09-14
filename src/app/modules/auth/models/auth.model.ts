export class RegisterAccountModel {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	isSaving: boolean;

	public constructor(init?: Partial<RegisterAccountModel>) {
		Object.assign(this, init);
	}
}
