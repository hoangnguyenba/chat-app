import {User} from "./user.model";
import {Thread} from "./thread.model";

export class Message {
  thread: Thread;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;

  // work on data from server
  constructor(obj?: any) {
    this.isRead          = obj && obj.isRead                || false;
    this.sentAt          = obj && obj.sentAt                || new Date();
    this.author          = obj && obj.author                || null;
    this.text            = obj && obj.text                  || null;
    this.thread          = obj && obj.thread                || null;
  }
}