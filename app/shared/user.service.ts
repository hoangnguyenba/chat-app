import { Injectable } from '@angular/core';

import { User } from './user.model';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

    constructor(private authHttp: AuthHttp) { }

    getCurrentUser() {
        // return new User("user1", "User One");

        return this.authHttp.get('http://localhost:3131/user/me').map((res) => {
            let body = res.json();
            return body || { };
            // return body.data || { };
        }).do(x => console.log(x));
    }
}