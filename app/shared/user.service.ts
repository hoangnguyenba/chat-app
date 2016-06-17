import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';
import { User } from './user.model';


/**
 * UserService manages our current user
 */
@Injectable()
export class UserService {
  // `currentUser` contains the current user
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor (private http: Http) {

  }

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }

  public getUserList(): Observable<any> {
    return this.http.get('http://localhost:3131/user/get-list').map(res => {
      return res.json();
    });
  }
}