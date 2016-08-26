import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from './angular2-jwt.service';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIG, AppConfig } from '../config';
import { contentHeaders } from './headers';
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

  public getManagerList(): Observable<any> {
    return this.authHttp.get( this.config.apiEndpoint + 'managers').map(res => {
      return res.json();
    });
  }

  public getUserOnline(): Observable<any> {
    return this.authHttp.get( this.config.apiEndpoint + 'users/online').map(res => {
      return res.json();
    });
  }

  public searchUsers(key: string): Observable<any> {
    return this.authHttp.post( this.config.apiEndpoint + 'users/search',
                                JSON.stringify({key: key}),
                                { headers: contentHeaders }).map(res => {
      return res.json().Items;
    });
  }
}
