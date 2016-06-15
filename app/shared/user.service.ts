import { Injectable } from '@angular/core';

import { User } from './user.model';

import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserService {

    constructor() { }

    getCurrentUser() {
        return new User("user1", "User One");
    }
}