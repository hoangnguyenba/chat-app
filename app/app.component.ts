import {Component} from '@angular/core';

import { ChatWindowComponent } from './chat-window';

import { MessageService, ThreadService, UserService } from './shared';

@Component({
    selector: 'chat-app',
    template: '<chat-window></chat-window>',
    providers: [MessageService, ThreadService, UserService]
})
export class AppComponent { 
}
