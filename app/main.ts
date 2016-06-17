import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthConfig, AuthHttp, AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';

import { AuthService } from './shared/auth.service';
import { AppComponent } from './app.component';

import { SocketService } from './shared/socket.service';
import { UserService, ThreadService, MessageService } from './shared';

import { APP_CONFIG, CHAT_APP_CONFIG } from './config';

bootstrap(AppComponent, [   
                            HTTP_PROVIDERS,
                            AUTH_PROVIDERS,
                            JwtHelper,
                            ROUTER_PROVIDERS, 
                            { provide: APP_CONFIG, useValue: CHAT_APP_CONFIG },
                            AuthService,
                            SocketService,
                            MessageService,
                            UserService,
                            ThreadService
                            // provide(AuthHttp, { 
                            //     useFactory: (http) => {
                            //         return new AuthHttp(new AuthConfig({
                            //         tokenName: 'jwt'
                            //         }), http);
                            //     },
                            //     deps: [Http]
                            // })
                        ]);
