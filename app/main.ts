import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app.routes'
import { AuthConfig, AuthHttp, AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';

import {    UserService, 
            ThreadService, 
            MessageService, 
            ChatUtilService, 
            SocketService, 
            AuthService,
            PushNotificationService,
            NotificationConfig,
            PageVisibilityService } from './shared';

import { APP_CONFIG, CHAT_APP_CONFIG, AppConfig } from './config';

import { ToastsManager } from 'ng2-toastr';

bootstrap(AppComponent, [   
                            HTTP_PROVIDERS,
                            AUTH_PROVIDERS,
                            JwtHelper,
                            APP_ROUTER_PROVIDERS, 
                            { provide: APP_CONFIG, useValue: CHAT_APP_CONFIG },
                            AuthService,
                            ChatUtilService,
                            MessageService,
                            UserService,
                            ThreadService,
                            SocketService,
                            ToastsManager,
                            PageVisibilityService,
                            // PushNotificationService
                            provide(PushNotificationService, { 
                                useFactory: () => {
                                    return new PushNotificationService(new NotificationConfig({
                                        title: "Chat App"
                                    }));
                                }
                            })
                            // {
                            //     provide: SocketService,
                            //     useFactory: (   config:AppConfig, 
                            //                     messageService: MessageService, 
                            //                     threadService: ThreadService,
                            //                     chatUtilService: ChatUtilService,
                            //                     userService: UserService) => {
                            //         return new SocketService(   config, 
                            //                                     messageService, 
                            //                                     threadService, 
                            //                                     chatUtilService, 
                            //                                     userService);
                            //     },
                            //     deps: [APP_CONFIG, MessageService, ThreadService, ChatUtilService, UserService]
                            // }
                            // provide(AuthHttp, { 
                            //     useFactory: (http) => {
                            //         return new AuthHttp(new AuthConfig({
                            //         tokenName: 'jwt'
                            //         }), http);
                            //     },
                            //     deps: [Http]
                            // })
                        ]);
