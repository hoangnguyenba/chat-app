"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_routes_1 = require('./app.routes');
var angular2_jwt_1 = require('angular2-jwt');
var app_component_1 = require('./app.component');
var shared_1 = require('./shared');
var config_1 = require('./config');
var ng2_toastr_1 = require('ng2-toastr');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    angular2_jwt_1.AUTH_PROVIDERS,
    angular2_jwt_1.JwtHelper,
    app_routes_1.APP_ROUTER_PROVIDERS,
    { provide: config_1.APP_CONFIG, useValue: config_1.CHAT_APP_CONFIG },
    shared_1.AuthService,
    shared_1.ChatUtilService,
    shared_1.MessageService,
    shared_1.UserService,
    shared_1.ThreadService,
    shared_1.SocketService,
    core_1.provide(ng2_toastr_1.ToastOptions, {
        useValue: new ng2_toastr_1.ToastOptions({
            positionClass: 'toast-bottom-right',
        })
    }),
    ng2_toastr_1.ToastsManager,
    shared_1.PageVisibilityService,
    shared_1.OptionService,
    shared_1.TextService,
    // PushNotificationService
    core_1.provide(shared_1.PushNotificationService, {
        useFactory: function () {
            return new shared_1.PushNotificationService(new shared_1.NotificationConfig({
                title: "Chat App"
            }));
        }
    }),
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
]);
//# sourceMappingURL=main.js.map