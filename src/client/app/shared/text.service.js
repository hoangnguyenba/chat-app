"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var option_service_1 = require('./option.service');
var TextService = (function () {
    function TextService(optionService) {
        this.optionService = optionService;
        // TODO: load data from server
        this.data = {
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
                'en': 'Friends',
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
    }
    TextService.prototype.get = function (text) {
        return this.data[text][this.optionService.data.language];
    };
    TextService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [option_service_1.OptionService])
    ], TextService);
    return TextService;
}());
exports.TextService = TextService;
//# sourceMappingURL=text.service.js.map