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
var router_1 = require('@angular/router');
var angular2_jwt_1 = require('angular2-jwt');
var ng2_toastr_1 = require('ng2-toastr');
var _chat_threads_1 = require('./+chat-threads');
var _chat_window_1 = require('./+chat-window');
var shared_1 = require('../../shared');
var index_1 = require('../shared/index');
var ChatComponent = (function () {
    function ChatComponent(messageService, userService, threadsService, jwtHelper, socketService, chatUtilService, toastr, notification, route, elRef, contentHeaderService) {
        this.messageService = messageService;
        this.userService = userService;
        this.threadsService = threadsService;
        this.jwtHelper = jwtHelper;
        this.socketService = socketService;
        this.chatUtilService = chatUtilService;
        this.toastr = toastr;
        this.notification = notification;
        this.route = route;
        this.elRef = elRef;
        this.contentHeaderService = contentHeaderService;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contentHeaderService.title = "";
        // if current use doesn't exist (because remmber jwt)
        this.userService.currentUser.subscribe(function (user) {
            _this.currentUser = user;
        });
        this.route
            .params
            .subscribe(function (params) {
            var thread_id = params['id'];
            if (typeof (thread_id) !== 'undefined') {
                // Find thread in list thread
                // Check if this thread is not sync ( never load )
                var sup = _this.threadsService.currentThread.subscribe(function (thread) {
                    if (!thread.is_sync) {
                        // Get messages of logged in user with this user from server
                        _this.messageService.getMessages(thread.id)
                            .subscribe(function (data) {
                            var messages_server = data.Items.map(function (message) {
                                return _this.chatUtilService.convertMessageFromServer(message, thread, _this.currentUser);
                            });
                            // Add messages into message service
                            _this.messageService.updates.next(function (messages) {
                                return messages.concat(messages_server);
                            });
                        });
                        thread.is_sync = true;
                    }
                });
                sup.unsubscribe();
            }
        });
    };
    ChatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat',
            directives: [_chat_threads_1.ChatThreadsComponent,
                _chat_window_1.ChatWindowComponent],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: 'chat.component.html',
            styleUrls: ['chat.component.css']
        }), 
        __metadata('design:paramtypes', [shared_1.MessageService, shared_1.UserService, shared_1.ThreadService, angular2_jwt_1.JwtHelper, shared_1.SocketService, shared_1.ChatUtilService, ng2_toastr_1.ToastsManager, shared_1.PushNotificationService, router_1.ActivatedRoute, core_1.ElementRef, index_1.ContentHeaderService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map