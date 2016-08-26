import {
  Component,
  DoCheck,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import {Message, User} from '../../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'chat-message',
  templateUrl: 'chat-message.component.html',
  styleUrls: ['chat-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent implements DoCheck, OnInit {

  @Input() message: Message;
  @Input() lastAuthor: User;
  @Input() index: number;
  @Input() length: number;
  @Output() updatedLastAuthor = new EventEmitter();

  private _messages: Message[] = [];

  ngOnInit(): any {
    let m = this.message;
    if(m !== undefined && m.text !== null) {
      var res = m.text.split('\n');

      res.forEach((text: string) => {
        let tempM: Message = Object.assign({}, m);
        tempM.text = text;
        this._messages.push(tempM);
      });
    }
  }

  ngDoCheck(): any {
    this.updatedLastAuthor.next(this.message.author);
  }

  isNewAuthor() {
    return this.lastAuthor === null || this.index === 0 || this.lastAuthor.id !== this.message.author.id;
  }

}
