import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { AuthConfig, AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthService } from './shared/auth.service';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [   HTTP_PROVIDERS,
                            AUTH_PROVIDERS,
                            ROUTER_PROVIDERS, 
                            AuthService
                            // provide(AuthHttp, { 
                            //     useFactory: (http) => {
                            //         return new AuthHttp(new AuthConfig({
                            //         tokenName: 'jwt'
                            //         }), http);
                            //     },
                            //     deps: [Http]
                            // })
                        ]);
