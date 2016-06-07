import {User} from "./user.model";
import {Thread} from "./thread.model";

export class Message {
  thread: Thread;
  sentAt: Date;
  isRead: boolean;
  author: User;
  text: string;
}