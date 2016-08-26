import { Injectable } from '@angular/core';
import { AppNotification } from './notification.model';

@Injectable()
export class NotificationService {

    public notifications: Array<AppNotification>;

    constructor() {
        this.notifications = [];
    }

    addNotification(noti: AppNotification) {
        this.notifications.push(noti);
    }

    removeNotification(noti: AppNotification) {
        var index = this.notifications.indexOf(noti);

        if (index > -1) {
            this.notifications.splice(index, 1);
        }
    }
}
