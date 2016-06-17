import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { APP_CONFIG, AppConfig } from '../config';

@Injectable()
export class AuthService {

    constructor(private http: Http, 
                private authHttp: AuthHttp,
                @Inject(APP_CONFIG) private config:AppConfig) { }

    isAuth() {
        return this.authHttp.get( this.config.apiEndpoint + 'is-auth').map((res) => {
            let body = res.json();
            // return body || { };
            return body.data || { };
        });
    }
}