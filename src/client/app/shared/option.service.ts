import { Injectable, Inject } from '@angular/core';

import { Response } from '@angular/http';

import { AuthHttp } from './angular2-jwt.service';
import { APP_CONFIG, AppConfig } from '../config';
import { contentHeaders } from './headers';

@Injectable()
export class OptionService {

    public data = {
        language: 'en',
        is_notification: true
    };

    private saveData: any = {};
    private selectSave = false;

    constructor(private authHttp: AuthHttp,
                @Inject(APP_CONFIG) private config:AppConfig
    ) {
        // If local doesn't have option, load from server
        if(localStorage.getItem('options') === null) {
            this.authHttp.get( this.config.apiEndpoint + 'managers/options', { headers: contentHeaders })
            .map((res: Response) => {
                return res.json();
            }).subscribe(data => {
                if(!_.isEmpty(data))
                    this.data = data.Item.options || this.data;
                // Save local
                localStorage.setItem('options', JSON.stringify(this.data));
            });
        } else {
            this.data = JSON.parse(localStorage.getItem('options')) || this.data;
        }
    }

    saveChanges() {
        this.selectSave = true;
    }

    showModel() {
        this.saveData = _.clone(this.data);
        this.selectSave = false;
    }

    hideModel() {
        if(this.selectSave === false) {
            this.data = _.clone(this.saveData);
        } else {
            this.authHttp.post( this.config.apiEndpoint + 'managers/options', JSON.stringify(this.data), { headers: contentHeaders })
            .map((res: Response) => {
                return res.json();
            }).subscribe(data => {
                if(data.status === true) {
                    // Save local
                    localStorage.setItem('options', JSON.stringify(this.data));
                }
            });
        }
        this.saveData = {};
    }
}
