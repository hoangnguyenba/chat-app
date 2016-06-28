import { Injectable, bind, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG, AppConfig } from '../config';
import { Thread, Message, MessageService } from '../shared';
import * as _ from 'underscore';

@Injectable()
export class ThreadService {

  // `threads` is a observable that contains the most up to date list of threads
  threads: Observable<{ [key: string]: Thread }>;

  // `orderedThreads` contains a newest-first chronological list of threads
  orderedThreads: Observable<Thread[]>;

  // `currentThread` contains the currently selected thread
  currentThread: Subject<Thread> =
    new BehaviorSubject<Thread>(new Thread());

  // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;

  constructor(public messageService: MessageService, 
              private authHttp: AuthHttp,
              @Inject(APP_CONFIG) private config:AppConfig) {

    this.threads = messageService.messages
      .map( (messages: Message[]) => {
        let threads: {[key: string]: Thread} = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;
        });
        return threads;
      });
      // .publishReplay(1)
      // .refCount();

    this.orderedThreads = this.threads
      .map((threadGroups: { [key: string]: Thread }) => {
        let threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.id);
      });

    this.currentThreadMessages = this.currentThread
      .combineLatest(messageService.messages,
                     (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: Message) =>
                    (message.thread.id === currentThread.id))
            .map((message: Message) => {
              message.isRead = true;
              return message; })
            .value();
        } else {
          return [];
        }
      });

    this.currentThread.subscribe(this.messageService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
    this.currentThread.next(newThread);
  }

  public getThreadList(): Observable<any> {
    return this.authHttp.get( this.config.apiEndpoint + 'threads').map(res => {
      return res.json().Responses.Thread;
    });
  }

}