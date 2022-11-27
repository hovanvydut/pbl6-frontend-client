export class WebSocketMessageModel {
	action: string;
	payload: any;
}

export class ProgressBarUpdatingModel {
    action: number;
    total: number;
    processed: number;

    public constructor(init?: Partial<ProgressBarUpdatingModel>) {
        Object.assign(this, init);
    }
}
