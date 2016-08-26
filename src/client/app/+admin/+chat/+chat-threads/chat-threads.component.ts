import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { APP_CONFIG, AppConfig } from '../../../config';
import { TextService, ThreadService, MessageService, Thread, Message, ChatUtilService } from '../../../shared/index';
import { ChatThreadComponent } from './chat-thread.component';

@Component({
  moduleId: module.id,
  selector: 'chat-threads',
  directives: [ChatThreadComponent],
  templateUrl: 'chat-threads.component.html',
  styleUrls: ['chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {

  unreadMessagesCount: number = 0;
  threads: Observable<any>;

  unreadServeMessagesCount: number = 0;
  serveThreads: Observable<any>;

  constructor(private threadService: ThreadService,
              private messageService: MessageService,
              private textService: TextService,
              private chatUtilService: ChatUtilService,
              @Inject(APP_CONFIG) private config:AppConfig) {
    this.threads = threadService.orderedThreads.map(threads => {
      return _.filter(threads, thread => (thread.type === Thread.THREAD_TYPE_ORDINARY));
    });

    this.serveThreads = threadService.orderedThreads.map(threads => {
      return _.filter(threads, thread => (thread.type === Thread.THREAD_TYPE_SERVE));
    });
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
              let messageIsInCurrentThread: boolean = this.chatUtilService.isSelectedChat &&
                m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              if (m && !m.isRead &&
                  !messageIsInCurrentThread &&
                  m.thread.type === Thread.THREAD_TYPE_ORDINARY &&
                  m.type === Message.MESSAGE_TYPE_TEXT) {
                sum = sum + 1;
              }
              return sum;
            },
            0);

        this.unreadServeMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              let messageIsInCurrentThread: boolean = this.chatUtilService.isSelectedChat &&
                m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              if (m && !m.isRead &&
                  !messageIsInCurrentThread &&
                  m.thread.type === Thread.THREAD_TYPE_SERVE &&
                  m.type === Message.MESSAGE_TYPE_TEXT) {
                sum = sum + 1;
              }
              return sum;
            },
            0);

            // Update title of app
            if(this.unreadMessagesCount > 0 || this.unreadServeMessagesCount > 0) {
              document.title = '(' + (this.unreadMessagesCount + this.unreadServeMessagesCount) + ') ' + this.config.title;
            } else {
              document.title = this.config.title;
            }
      });
  }

}
