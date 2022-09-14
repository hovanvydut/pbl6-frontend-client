export class SignInModel {
	email: string;
	password: string;
	rememberMe = false;
	deviceToken: string;
	platform: string;
	//
	// For UI
	isLogging: boolean;

	public constructor(init?: Partial<SignInModel>) {
		Object.assign(this, init);
	}
}
