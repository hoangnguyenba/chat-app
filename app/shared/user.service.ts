import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable()
export class UserService {

    constructor() { }

    getCurrentUser() {
        return new User();
    }
}