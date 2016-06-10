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
    this.sentAt          = obj && obj.created_at            || new Date();
    this.author          = obj && new User(obj.author)      || null;
    this.text            = obj && obj.text                  || null;
    this.thread          = obj && new Thread(obj.thread_id) || null;
  }
}