export class ProfileGeneralInfoModel {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    isEnableCallForwarding: boolean = false;

    // woo_ai
    public constructor(init?: Partial<ProfileGeneralInfoModel>) {
        Object.assign(this, init);

        if (!this.isEnableCallForwarding) this.isEnableCallForwarding = false;
    }
}

export class ProfileNotificationModel {
    id: string;

    public constructor(init?: Partial<ProfileNotificationModel>) {
        Object.assign(this, init);
    }
}
