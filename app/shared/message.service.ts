import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Subject, Observable} from 'rxjs/Rx';

import { User } from './user.model';
import { Thread } from './thread.model';
import { Message } from './message.model';

let initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

declare var io: any;

@Injectable()
export class MessageService {

  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;

  // `updates` receives _operations_ to be applied to our `messages`
  // it's a way we can perform changes on *all* messages (that are currently 
  // stored in `messages`)
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  private serverUrl:String = 'http://localhost:3131/';
  private socket: any;

  constructor(private http: Http) {
    this.socket = new io(this.serverUrl);


    this.messages = this.updates
      .do((x)=> console.log('updates1 :' + x))
      // watch the updates and accumulate operations on the messages
      .scan((messages: Message[],
             operation: IMessagesOperation) => {
               return operation(messages);
             },
            initialMessages)
      // make sure we can share the most recent list of messages across anyone
      // who's interested in subscribing and cache the last known list of
      // messages
      .publishReplay(1)
      .refCount();

    // `create` takes a Message and then puts an operation (the inner function)
    // on the `updates` stream to add the Message to the list of messages.
    //
    // That is, for each item that gets added to `create` (by using `next`)
    // this stream emits a concat operation function.
    //
    // Next we subscribe `this.updates` to listen to this stream, which means
    // that it will receive each operation that is created
    //
    // Note that it would be perfectly acceptable to simply modify the
    // "addMessage" function below to simply add the inner operation function to
    // the update stream directly and get rid of this extra action stream
    // entirely. The pros are that it is potentially clearer. The cons are that
    // the stream is no longer composable.
    this.create
      .do((x)=> console.log('create :' + x))
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
          return messages.concat(message);
        };
      })
      .subscribe(this.updates);
      // .subscribe((x) => console.log(x));

    this.newMessages
      .do((x)=> {console.log('newMessages :');console.log(x)})
      .subscribe(this.create);

    // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            // note that we're manipulating `message` directly here. Mutability
            // can be confusing and there are lots of reasons why you might want
            // to, say, copy the Message object or some other 'immutable' here
            if (message.thread.id === thread.id) {
              message.isRead = true;
            }
            return message;
          });
        };
      })
      .subscribe(this.updates);
  }

  // an imperative function call to this action stream
  addMessage(message: Message, is_sync: Boolean = true): void {

    console.log(message);

    this.newMessages.next(message);

    if(is_sync)
      this.socket.emit('chat_message', message);
  }

  getMessages(thread_id: String): Observable<any> {
      return this.http.get(this.serverUrl + 'fetch?thread_id=' + thread_id)
                    .map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
    // return body.data || { };
  }
}