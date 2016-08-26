import { Message } from './message.model';
import { User } from './user.model';

// 3 type of thread: 
// + Thread for client: thread_id = user_id ( THREAD_TYPE_SERVE )
// + Thread for admin vs admin: thread_id = user1_id:user2_id ( THREAD_TYPE_ORDINARY )
// + Thread for multi chat: thread_id = "something" ( THREAD_TYPE_ORDINARY )
export class Thread {

  public static get THREAD_TYPE_ORDINARY():number { return 0; }
  public static get THREAD_TYPE_SERVE():number { return 1; }

  public static get THREAD_SERVE_STATUS_IDLE():number { return 0; }
  public static get THREAD_SERVE_STATUS_INCOMING_CHAT():number { return 1; }
  public static get THREAD_SERVE_STATUS_SERVED():number { return 2; }

  id: string;
  name: string;
  status: number;
  lastMessage: Message;
  is_sync: boolean;
  type: number;
  serve_status: number;

  constructor(obj?: any) {
    this.id             = obj && obj.id                || null;
    this.name           = obj && obj.name              || null;
    this.status         = obj && obj.status            || User.USER_STATUS_ONLINE;
    this.is_sync        = obj && obj.is_sync           || false;
    this.type           = obj && obj.type              || Thread.THREAD_TYPE_ORDINARY;
    this.serve_status   = obj && obj.serve_status      || Thread.THREAD_SERVE_STATUS_IDLE;
    this.lastMessage    = obj && obj.lastMessage       || null;
}
}
