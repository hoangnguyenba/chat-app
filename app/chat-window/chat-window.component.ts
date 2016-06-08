import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {
  MessageService,
  ThreadService,
  UserService
} from '../shared';
import {Observable} from 'rxjs';
import {User, Thread, Message} from '../shared';

import { ChatMessageComponent } from './chat-message.component';

@Component({
  selector: 'chat-window',
  directives: [ChatMessageComponent,
               FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app/chat-window/chat-window.component.html',
  styleUrls: ['app/chat-window/chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messageService: MessageService,
              public threadService: ThreadService,
              public userService: UserService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages = this.threadService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.currentUser = this.userService.getCurrentUser();

    // this.messages
    //   .subscribe(
    //     (messages: Array<Message>) => {
    //       setTimeout(() => {
    //         this.scrollToBottom();
    //       });
    //     });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messageService.addMessage(m);
    this.draftMessage = new Message();
  }

  // scrollToBottom(): void {
  //   let scrollPane: any = this.el
  //     .nativeElement.querySelector('.msg-container-base');
  //   scrollPane.scrollTop = scrollPane.scrollHeight;
  // }

}
