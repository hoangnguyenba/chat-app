import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import { Injector, ReflectiveInjector } from '@angular/core';

import { ChatContainerComponent } from './chat-container/chat-container.component';
import { LoginComponent } from './login/login.component';

import { Thread, Message, User } from './shared';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
    selector: 'chat-app',
    template: '<router-outlet></router-outlet>',
    directives: [ChatContainerComponent, ROUTER_DIRECTIVES]
})
export class AppComponent {  
}
