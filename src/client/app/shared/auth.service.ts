import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { Router } from '@angular/router';

import { AuthHttp } from './angular2-jwt.service';

import { APP_CONFIG, AppConfig } from '../config';
import { contentHeaders } from './headers';
import { User, UserService } from './index';
import { tokenNotExpired } from './angular2-jwt.service';

@Injectable()
export class AuthService {

    isLoggedIn = false;

    constructor(private http: Http,
                private authHttp: AuthHttp,
                private router: Router,
                private userService: UserService,
                @Inject(APP_CONFIG) private config:AppConfig) { }

    isAuth(): Boolean {

        if(tokenNotExpired()) {
            return true;
        } else {
            return false;
        }
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
                if(data.status === true)
                    this.router.navigate(['/']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }

    logout() {
        this.authHttp.post( this.config.apiEndpoint + 'logout', '', { headers: contentHeaders })
        .map((res) => {
            let body = res.json();
            return body || { };
        })
        .subscribe(
            data => {
                if(data.status === true) {
                    localStorage.removeItem('id_token');
                    this.router.navigate(['/login']);
                }
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
        );
    }
}
