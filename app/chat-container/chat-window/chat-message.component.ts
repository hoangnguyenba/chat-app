import {
  Component,
  OnInit,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {Message} from '../../shared';

@Component({
  inputs: ['message'],
  selector: 'chat-message',
  templateUrl: 'app/chat-container/chat-window/chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {
  message: Message;

  constructor() {
  }

  ngOnInit(): void {
  }

}