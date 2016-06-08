import {Component} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';

import { ChatWindowComponent } from './chat-window/index';

import { UserService, ThreadService, MessageService } from './shared';


@Component({
    selector: 'chat-app',
    template: '<chat-window></chat-window>',
    directives: [ChatWindowComponent],
    providers: [HTTP_PROVIDERS, UserService, MessageService, ThreadService]
})
export class AppComponent {
}
