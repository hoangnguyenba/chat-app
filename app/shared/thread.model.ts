import { Message } from './message.model';

export class Thread {
  id: string;
  name: string;
  lastMessage: Message;

  constructor(obj?: any) {
    this.id             = obj && obj.id                || null;
    this.name           = obj && obj.name              || null;
  }
}