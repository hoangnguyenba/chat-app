import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig, RouterLink, Router, RouterOutlet, ROUTER_PROVIDERS, CanActivate } from '@angular/router-deprecated';
import { Injector, ReflectiveInjector } from '@angular/core';

import { ChatWindowComponent } from './chat-window/index';
import { LoggedInRouterOutlet } from './shared/loggedin-outlet.directive';
import { LoginComponent } from './login/login.component';

import { AuthService } from './shared/auth.service';
import { UserService, ThreadService, MessageService, Thread, Message, User } from './shared';


@Component({
    selector: 'chat-app',
    template: '<router-outlet></router-outlet>',
    directives: [ChatWindowComponent, LoggedInRouterOutlet],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserService, MessageService, ThreadService]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Chat'] },
  { path: '/chat', component: ChatWindowComponent, as: 'Chat' },
  { path: '/login', component: LoginComponent, as: 'Login' }
])
// @CanActivate((next, prev) => {

    // var injector: Injector = ReflectiveInjector.resolveAndCreate([AuthService]);
    // var authService = injector.get(AuthService);

    // return authService.isAuth().map((data: any) => data.status).do((x:any) => console.log(x)).toPromise();

//     return true;
// })
export class AppComponent implements OnInit{

    constructor(private messageService: MessageService,
                private userService: UserService,
                private threadsService: ThreadService)
    {
    }

    ngOnInit(): void {
        // this.messageService.messages.subscribe(() => ({}));

        // set "Juliet" as the current user
        // this.userService.setCurrentUser(me);

        // create the initial messages
        this.messageService.getMessages('user1:user2').subscribe((data) => {
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
