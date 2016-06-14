import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    isAuth() {
        return this.http.get('http://localhost:3131/is-auth').map((res) => {
            let body = res.json();
            return body || { };
            // return body.data || { };
        });
    }
}