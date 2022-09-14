export class AppStorage {
	constructor() {
	}

	static getTokenData(dataKey: string): string {
		const token = localStorage.getItem(dataKey);
		return token ? decodeURIComponent(atob(token)) : '';
	}

	static storeTokenData(dataKey: string, data: any) {
		localStorage.setItem(dataKey, btoa(encodeURIComponent(data)));
	}
}
