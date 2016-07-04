import {
  Component,
  DoCheck,
  ElementRef,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {Message, User} from '../../shared';

@Component({
  selector: 'chat-message',
  templateUrl: 'app/+chat-container/+chat-window/chat-message.component.html',
  styleUrls: ['app/+chat-container/+chat-window/chat-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements DoCheck {
  @Input() message: Message;
  @Input() lastAuthor: User;
  @Input() index: number;
  @Input() length: number;
  @Output() updatedLastAuthor = new EventEmitter();

  constructor() {
  }

  ngDoCheck(): any {
    this.updatedLastAuthor.next(this.message.author);
  }

  isNewAuthor() {
    return this.lastAuthor == null || this.index == 0 || this.lastAuthor.id != this.message.author.id;
  }

}