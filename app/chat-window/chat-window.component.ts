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

@Component({
  inputs: ['message'],
  selector: 'chat-message',
  template: `
  <div class="msg-container">

    <div class="avatar">
      <img src="{{message.author.avatarSrc}}">
    </div>

    <div class="messages msg-sent">
      <p>{{message.text}}</p>
      <time>• {{message.sentAt}}</time>
    </div>
  </div>
  `
})
export class ChatMessageComponent implements OnInit {
  message: Message;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'chat-window',
  directives: [ChatMessageComponent,
               FORM_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chat-window-container">
      <div class="chat-window">
        <div class="panel-container">
          <div class="panel panel-default">

            <div class="panel-heading top-bar">
              <div class="panel-title-container">
                <h3 class="panel-title">
                  <span class="glyphicon glyphicon-comment"></span>
                  Chat - {{currentThread.name}}
                </h3>
              </div>
              <div class="panel-buttons-container">
                <!-- you could put minimize or close buttons here -->
              </div>
            </div>

            <div class="panel-body msg-container-base">
              <chat-message
                   *ngFor="let message of messages | async"
                   [message]="message">
              </chat-message>
            </div>

            <div class="panel-footer">
              <div class="input-group">
                <input type="text" 
                       class="chat-input"
                       placeholder="Write your message here..."
                       (keydown.enter)="onEnter($event)"
                       [(ngModel)]="draftMessage.text" />
                <span class="input-group-btn">
                  <button class="btn-chat"
                     (click)="onEnter($event)"
                     >Send</button>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
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

    this.messages
      .subscribe(
        (messages: Array<Message>) => {
          setTimeout(() => {
            this.scrollToBottom();
          });
        });
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

  scrollToBottom(): void {
    let scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
