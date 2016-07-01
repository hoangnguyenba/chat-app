import {
  Component,
  OnInit,
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
  styleUrls: ['app/+chat-container/+chat-window/chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
  @Input() message: Message;
  @Input() lastAuthor: User;
  @Input() index: number;
  @Output() updateLastAuthor = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.updateLastAuthor.next(this.message.author);
  }

  isNewAuthor() {
    return this.lastAuthor == null || this.index == 0 || this.lastAuthor.id != this.message.author.id;
  }

}