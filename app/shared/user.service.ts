import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

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

  constructor (private http: Http, @Inject(APP_CONFIG) private config:AppConfig) {
  }

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }

  public getUserList(): Observable<any> {
    return this.http.get( this.config.apiEndpoint + 'user/get-list').map(res => {
      return res.json();
    });
  }
}