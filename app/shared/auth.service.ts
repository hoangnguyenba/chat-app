import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AuthService {

    constructor(private http: Http, private authHttp: AuthHttp) { }

    isAuth() {
        return this.authHttp.get('http://localhost:3131/is-auth').map((res) => {
            let body = res.json();
            // return body || { };
            return body.data || { };
        });
    }
}