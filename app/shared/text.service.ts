import { Injectable } from '@angular/core';

import { OptionService } from './option.service';

@Injectable()
export class TextService {

    // TODO: load data from server
    private data: any = {
        app_name: {
            'en': 'Chat App',
            'jp': 'チャットアプリ'
        },
        dashboard: {
            'en': 'Dashboard',
            'jp': 'ダッシュボード'
        },
        trigger: {
            'en': 'Trigger',
            'jp': '引き金'
        },
        history: {
            'en': 'History',
            'jp': '歴史'
        },
        menu: {
            'en': 'Menu',
            'jp': 'メニュー'
        },
        friends: {
            'en': 'friends',
            'jp': '友人'
        }
    };

    public get(text: string) {
        return this.data[text][this.optionService.language];
    }

    constructor(
        private optionService: OptionService
    ) { }

}