import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig } from '@angular/router-deprecated';
import { Injector, ReflectiveInjector } from '@angular/core';

import { ChatContainerComponent } from './chat-container/chat-container.component';
import { LoginComponent } from './login/login.component';

import { AuthRouterOutlet } from './shared/auth-router-outlet.directive';
import { Thread, Message, User } from './shared';


@Component({
    selector: 'chat-app',
    template: '<auth-router-outlet></auth-router-outlet>',
    directives: [ChatContainerComponent, AuthRouterOutlet]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Chat'] },
  { path: '/chat', component: ChatContainerComponent, as: 'Chat' },
  { path: '/login', component: LoginComponent, as: 'Login' }
])
export class AppComponent {

    
}
