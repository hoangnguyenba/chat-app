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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var config_1 = require('../config');
var headers_1 = require('./headers');
var OptionService = (function () {
    function OptionService(authHttp, config) {
        var _this = this;
        this.authHttp = authHttp;
        this.config = config;
        this.saveData = {};
        this.selectSave = false;
        this.data = {
            language: "en",
            is_notification: true
        };
        // If local doesn't have option, load from server
        if (localStorage.getItem('options') == null) {
            this.authHttp.get(this.config.apiEndpoint + 'users/options', { headers: headers_1.contentHeaders })
                .map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                _this.data = data.Item.options || _this.data;
                // Save local
                localStorage.setItem('options', JSON.stringify(_this.data));
            });
        }
        else {
            this.data = JSON.parse(localStorage.getItem('options')) || this.data;
        }
    }
    OptionService.prototype.saveChanges = function () {
        this.selectSave = true;
    };
    OptionService.prototype.showModel = function () {
        this.saveData = _.clone(this.data);
        this.selectSave = false;
    };
    OptionService.prototype.hideModel = function () {
        var _this = this;
        if (this.selectSave == false) {
            this.data = _.clone(this.saveData);
            this.saveData = {};
            this.authHttp.post(this.config.apiEndpoint + 'users/options', JSON.stringify(this.data), { headers: headers_1.contentHeaders })
                .map(function (res) {
                return res.json();
            }).subscribe(function (data) {
                if (data.status == true) {
                    // Save local
                    localStorage.setItem('options', JSON.stringify(_this.data));
                }
            });
        }
    };
    OptionService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(config_1.APP_CONFIG)), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, Object])
    ], OptionService);
    return OptionService;
}());
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map