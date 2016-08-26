import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../../shared/angular2-jwt.service';

import { APP_CONFIG, AppConfig } from '../../config';

@Injectable()
export class HistoryService {

    constructor (private authHttp: AuthHttp, @Inject(APP_CONFIG) private config:AppConfig) {
    }

    public getRecentUsers(): Observable<any> {
        return this.authHttp.get( this.config.apiEndpoint + 'users/recent').map(res => {
            return res.json();
        });
    }

    public getHistoryThread(thread_id: string): Observable<any> {
        return this.authHttp.get( this.config.apiEndpoint + 'messages/' + thread_id).map(res => {
            return res.json();
        });
    }
}
