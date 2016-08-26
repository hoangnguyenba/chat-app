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
        app_name_mini: {
            'en': 'APP',
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
        visit_list: {
            'en': 'Visit List',
            'jp': '歴史'
        },
        menu: {
            'en': 'Menu',
            'jp': 'メニュー'
        },
        admins: {
            'en': 'Admins',
            'jp': '友人'
        },
        notification: {
            'en': 'Notification',
            'jp': 'お知らせ'
        },
        turn_on_notification: {
            'en': 'Turn on notification',
            'jp': '通知をオンにします'
        },
        language: {
            'en': 'Language',
            'jp': '言語'
        },
        english: {
            'en': 'English',
            'jp': 'English'
        },
        japanese: {
            'en': 'Japanese',
            'jp': '日本語'
        },
        setting: {
            'en': 'Setting',
            'jp': '設定'
        },
        profile: {
            'en': 'Profile',
            'jp': '設定'
        }
    };

    public get(text: string) {
        return this.data[text][this.optionService.data.language];
    }

    constructor(
        private optionService: OptionService
    ) { }

}
