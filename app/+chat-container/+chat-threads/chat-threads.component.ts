import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { APP_CONFIG, AppConfig } from '../../config';
import { ThreadService, MessageService, Thread, Message } from '../../shared';
import { ChatThreadComponent } from './chat-thread.component';

@Component({
  selector: 'chat-threads',
  directives: [ChatThreadComponent],
  templateUrl: 'app/+chat-container/+chat-threads/chat-threads.component.html',
  styleUrls: ['app/+chat-container/+chat-threads/chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {

  unreadMessagesCount: number;
  threads: Observable<any>;

  constructor(private threadService: ThreadService,
              private messageService: MessageService,
              @Inject(APP_CONFIG) private config:AppConfig) {
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

            // Update title of app
            if(this.unreadMessagesCount > 0)
              document.title = "(" + this.unreadMessagesCount + ") " + this.config.title;
            else
              document.title = this.config.title;
      });
  }

}