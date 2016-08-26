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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var angular2_jwt_1 = require('angular2-jwt');
var config_1 = require('../config');
var headers_1 = require('./headers');
var index_1 = require('./index');
var angular2_jwt_2 = require('angular2-jwt');
var AuthService = (function () {
    function AuthService(http, authHttp, router, userService, config) {
        this.http = http;
        this.authHttp = authHttp;
        this.router = router;
        this.userService = userService;
        this.config = config;
        this.isLoggedIn = false;
    }
    AuthService.prototype.isAuth = function () {
        if (angular2_jwt_2.tokenNotExpired()) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        var body = JSON.stringify({ username: username, password: password });
        this.http.post(this.config.apiEndpoint + 'login', body, { headers: headers_1.contentHeaders })
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            localStorage.setItem('id_token', data.id_token);
            _this.userService.setCurrentUser(new index_1.User(data.user));
            if (data.status == true)
                _this.router.navigate(['/']);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.authHttp.post(this.config.apiEndpoint + 'logout', "", { headers: headers_1.contentHeaders })
            .map(function (res) {
            var body = res.json();
            return body || {};
        })
            .subscribe(function (data) {
            if (data.status == true) {
                localStorage.removeItem('id_token');
                _this.router.navigate(['/login']);
            }
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __param(4, core_1.Inject(config_1.APP_CONFIG)), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp, router_1.Router, index_1.UserService, Object])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map