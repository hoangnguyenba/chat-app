import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Message, User } from '../../../shared/index';

import { ChatMessageComponent } from './chat-message.component';

@Component({
    moduleId: module.id,
    selector: 'list-message',
    templateUrl: 'list-message.component.html',
    directives: [ChatMessageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMessageComponent {

    @Input() messages: Array<Message>;

    lastAuthor: User;

    onUpdateLastAuthor(author: User): void {
        this.lastAuthor = author;
    }
}
