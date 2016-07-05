import { Message } from './message.model';

export class Thread {
  id: string;
  name: string;
  lastMessage: Message;
  is_sync: boolean;

  constructor(obj?: any) {
    this.id             = obj && obj.id                || null;
    this.name           = obj && obj.name              || null;
    this.is_sync = false;
  }
}