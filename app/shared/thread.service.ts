import {Injectable, bind} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs/Rx';
import {Thread, Message, MessageService} from '../shared';
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

  constructor(public messageService: MessageService) {

    this.threads = messageService.messages
      .do((messages) => console.log(messages))
      .map( (messages: Message[]) => {
        let threads: {[key: string]: Thread} = {};
        // Store the message's thread in our accumulator `threads`
        messages.map((message: Message) => {
          threads[message.thread.id] = threads[message.thread.id] ||
            message.thread;
        });
        return threads;
      });

    this.currentThreadMessages = this.currentThread
      .combineLatest(messageService.messages,
                     (currentThread: Thread, messages: Message[]) => {
        console.log('Thread');
        console.log(currentThread);
        console.log('Message');
        console.log(messages);
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

}