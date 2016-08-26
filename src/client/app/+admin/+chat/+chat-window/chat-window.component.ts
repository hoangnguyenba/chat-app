import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import {FORM_DIRECTIVES} from '@angular/common';

import {
  MessageService,
  ThreadService,
  UserService,
  ChatUtilService
} from '../../../shared/index';

import { Observable } from 'rxjs/Observable';
import { User, Thread, Message, SocketService } from '../../../shared/index';

import { ChatMessageComponent } from './chat-message.component';
import { ListMessageComponent } from './list-message.component';

@Component({
  moduleId: module.id,
  selector: 'chat-window',
  directives: [ChatMessageComponent,
               ListMessageComponent,
               FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'chat-window.component.html',
  styleUrls: ['chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  isPressEnter: boolean = true;
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(private messageService: MessageService,
              private threadService: ThreadService,
              private userService: UserService,
              private socketService: SocketService,
              private chatUtilService: ChatUtilService,
              private el: ElementRef) {
  }

  ngOnInit(): void {

    // Calculate height of body box
    this.fixWindow();

    this.messages = this.threadService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.userService.currentUser.subscribe((user) => {
      this.currentUser = new User(user);
    });

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });

  }
  onEnter(event: any): void {
    if((!this.isPressEnter && !event.ctrlKey) || event.keyCode !== 13)
      return;
    this.sendMessage();
    event.preventDefault();
  }

  onClickSend(event: Event) {
    event.preventDefault();
    this.sendMessage();
  }

  sendMessage(): void {
    if(this.chatUtilService.isEmpty(this.draftMessage.text))
      return;
    if(this.draftMessage.text === null)
      return;
    let m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.socketService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('#chat-box');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

  private fixWindow() {
    let elHeader = this.el.nativeElement.children[0].children[0];
    let elBody = this.el.nativeElement.children[0].children[1];
    let elFooter = this.el.nativeElement.children[0].children[2];

    let minHeight = this.chatUtilService.mainHeight - (elHeader.offsetHeight + elFooter.offsetHeight + 60);
    elBody.style.height = minHeight + 'px';
  }
}
