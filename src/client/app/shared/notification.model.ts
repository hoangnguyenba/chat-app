export class ServeRequest {
    user: any;
    thread: any;
}

export enum NotificationEnum {
    ServeRequest
}

export class AppNotification {

  public static get NOTIFICATION_TYPE_SERVE_REQUEST():number { return 0; }

  id: string;
  type: number;
  data: NotificationEnum;

  constructor(obj?: any) {
    this.id          = obj && obj.id                || null;
    this.type          = obj && obj.type            || AppNotification.NOTIFICATION_TYPE_SERVE_REQUEST;
  }
}
