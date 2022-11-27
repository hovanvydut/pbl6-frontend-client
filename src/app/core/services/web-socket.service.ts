import {EventEmitter, Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs';
//
import {environment} from 'src/environments/environment';
import {BaseService} from '@app/core/services/base.service';
import { NotificationService } from '@app/shared/services/notification.service';
import { NotificationResponseModel } from '@app/shared/models/notification.model';
import { WebSocketMessageModel } from '@app/shared/models/web-socket-message.model';

export const RECONNECT_SIGNAL_INTERVAL = 3500;

enum BroadCastAction {
    BroadcastNotification = 'broadcastNotification',
}

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public data: any[];
    private notificationEmitter = new EventEmitter<NotificationResponseModel>(null);

    private connectionDisconnectedSubject = new Subject();
    private notificationService: NotificationService;

    private webSocketClient: WebSocket;

    constructor(injector: Injector, private baseService: BaseService) {
        setTimeout(() => {
            this.notificationService = injector.get(NotificationService);
        });

        setInterval(() => {
            console.log('new nôtification');
            this.notificationEmitter.next(new NotificationResponseModel());
        }, 10000);


        this.connect();
        
        //

        // Auto restart WebSocket until it's connected
        setInterval(() => {
            if (!this.baseService.currentUser || !this.baseService.isLoggedIn) {
                return;
            }

            if (this.webSocketClient && this.webSocketClient.readyState !== WebSocket.CLOSED) {
                return;
            }

            console.log('WebSocket Connecting...');
            this.connectionDisconnectedSubject.next(false);

            this.connect();
        }, RECONNECT_SIGNAL_INTERVAL);

        
    }

    private _connectionId: string;

    get connectionId(): string {
        return this._connectionId;
    }

    public connect() {
        
        if (!this.baseService.currentUser || !this.baseService.currentUser.id || !this.baseService.isLoggedIn) {
            return;
        }
        //
        // Stop WebSocket
        if (this.webSocketClient) {
            this.webSocketClient.close();
            this.webSocketClient = null;
        }
        this._connectionId = null;

        let loggedId = 'abcbabcb';
        //
        // Connect
        const endpoint = environment.webSocketEndpoint + '?loggedId=' + loggedId;
        let ws = new WebSocket(endpoint);

        this.webSocketClient = ws;

        ws.onmessage = (message) => {
            this.onReceiveMessage(message.data);
        };
        ws.onerror = (error) => {
            // console.log('WebSocket Error', error);
        };
        ws.onclose = () => {
            this.connectionDisconnectedSubject.next(true);
            ws.close();
            // console.log('WebSocket Closed');
        };
        ws.onopen = (ev) => {
            // console.log('Successfully connected');
            ws.send(loggedId);
        };
    }

    subscribeNotification(): EventEmitter<NotificationResponseModel> {
        return this.notificationEmitter;
    }

    onRegisterDisconnectionEvent() {
        return this.connectionDisconnectedSubject.asObservable();
    }

    private onReceiveMessage(data: string) {
        try {
            const message = JSON.parse(data) as WebSocketMessageModel;
            console.log('Received Message: ', message);

            const action = message.action;
            const payload = message.payload;
            switch (action) {
                case BroadCastAction.BroadcastNotification:
                    this.notificationEmitter.next(payload);
                    break;
            }
        } catch {
            // Do nothing
        }
    }
}
