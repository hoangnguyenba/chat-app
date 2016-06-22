import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { APP_CONFIG, AppConfig } from '../config';
import { User } from './user.model';


/**
 * UserService manages our current user
 */
@Injectable()
export class UserService {
  // `currentUser` contains the current user
  currentUser: Subject<User> = new BehaviorSubject<User>(null);

  constructor (private authHttp: AuthHttp, @Inject(APP_CONFIG) private config:AppConfig) {
  }

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }

  public getUserList(): Observable<any> {
    return this.authHttp.get( this.config.apiEndpoint + 'users').map(res => {
      return res.json();
    });
  }
}