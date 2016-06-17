import {
  Component,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { ThreadService, MessageService, Thread, Message } from '../../shared';

import { ChatThreadComponent } from './chat-thread.component';

@Component({
  selector: 'chat-threads',
  directives: [ChatThreadComponent],
  templateUrl: 'app/chat-container/chat-threads/chat-threads.component.html'
})
export class ChatThreadsComponent implements OnInit {

  unreadMessagesCount: number;
  threads: Observable<any>;

  constructor(private threadService: ThreadService,
              private messageService: MessageService) {
    this.threads = threadService.orderedThreads;
  }

  ngOnInit(): void {
    this.messageService.messages
      .combineLatest(
        this.threadService.currentThread,
        (messages: Message[], currentThread: Thread) =>
          [currentThread, messages] )

      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              let messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            },
            0);
      });
  }

}