import {User} from './user.model';
import {Thread} from './thread.model';

export class Message {

  public static get MESSAGE_TYPE_TEXT():number { return 0; }
  public static get MESSAGE_TYPE_CHANGE_USER_STATUS():number { return 1; }
  public static get MESSAGE_TYPE_CHANGE_THREAD_STATUS():number { return 2; }
  public static get MESSAGE_TYPE_MARK_THREAD_AS_READ():number { return 3; }

  thread: Thread;
  sentAt: Date;
  isRead: boolean;
  author: User;

  type: number;

  // Ordinary message
  text: string;

  // Message notify user change status
  status: number;

  // work on data from server
  constructor(obj?: any) {
    this.isRead          = obj && obj.isRead                || false;
    this.sentAt          = obj && obj.sentAt                || new Date();
    this.author          = obj && obj.author                || null;
    this.text            = obj && obj.text                  || null;
    this.thread          = obj && obj.thread                || null;
    this.type            = obj && obj.type                  || Message.MESSAGE_TYPE_TEXT;
    this.status          = obj && obj.status                || User.USER_STATUS_OFFLINE;
  }
}
