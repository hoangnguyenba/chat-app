import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig } from '@angular/router-deprecated';
import { Injector, ReflectiveInjector } from '@angular/core';

import { ChatWindowComponent } from './chat-window/index';
import { LoginComponent } from './login/login.component';

import { AuthRouterOutlet } from './shared/auth-router-outlet.directive';
import { UserService, ThreadService, MessageService, Thread, Message, User } from './shared';


@Component({
    selector: 'chat-app',
    template: '<auth-router-outlet></auth-router-outlet>',
    directives: [ChatWindowComponent, AuthRouterOutlet],
    providers: [ UserService, MessageService, ThreadService ]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Chat'] },
  { path: '/chat', component: ChatWindowComponent, as: 'Chat' },
  { path: '/login', component: LoginComponent, as: 'Login' }
])
export class AppComponent implements OnInit{

    constructor(private messageService: MessageService,
                private userService: UserService,
                private threadsService: ThreadService)
    {
    }

    ngOnInit(): void {
        this.messageService.messages.subscribe(() => ({}));

        // set "Juliet" as the current user
        // this.userService.setCurrentUser(me);

        // create the initial messages
        this.messageService.getMessages('user1:user2')
          .subscribe((data) => {
            var messages_server:Message[] = data.Items.map((item: any) => {
                return new Message(item);
            });
            
            this.messageService.updates.next((messages: Message[]) => {
                return messages.concat(messages_server);
            });
        });


        this.threadsService.setCurrentThread(new Thread("user1:user2"));
    }
}
