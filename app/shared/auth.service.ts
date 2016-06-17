import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { Router } from '@angular/router-deprecated';

import { AuthHttp } from 'angular2-jwt';

import { APP_CONFIG, AppConfig } from '../config';
import { contentHeaders } from './headers';
import { User, UserService } from './index';

@Injectable()
export class AuthService {

    constructor(private http: Http, 
                private authHttp: AuthHttp,
                private router: Router,
                private userService: UserService,
                @Inject(APP_CONFIG) private config:AppConfig) { }

    isAuth() {
        return this.authHttp.get( this.config.apiEndpoint + 'is-auth').map((res) => {
            let body = res.json();
            // return body || { };
            return body.data || { };
        });
    }

    login(username: String, password: String) {
        let body = JSON.stringify({ username, password });
        this.http.post( this.config.apiEndpoint + 'login', body, { headers: contentHeaders })
        .map((res) => {
            let body = res.json();  
            return body || { };
        })
        .subscribe(
            data => {
                localStorage.setItem('id_token', data.id_token);
                this.userService.setCurrentUser(new User(data.user));
                if(data.status == true)
                    this.router.navigateByUrl('/');
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
  }
}