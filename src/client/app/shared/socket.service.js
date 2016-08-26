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
var config_1 = require('../config');
var ng2_toastr_1 = require('ng2-toastr');
var shared_1 = require('../shared');
var _ = require('underscore');
var SocketService = (function () {
    function SocketService(config, messageService, threadService, chatUtilService, userService, notificationService, pageVisibilityService, optionService, toastsService) {
        var _this = this;
        this.config = config;
        this.messageService = messageService;
        this.threadService = threadService;
        this.chatUtilService = chatUtilService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.pageVisibilityService = pageVisibilityService;
        this.optionService = optionService;
        this.toastsService = toastsService;
        this.socket = new io(this.config.apiEndpoint);
        var sub = this.threadService.threads.subscribe(function (threadGroups) {
            var newThreads = _.values(threadGroups);
            newThreads.forEach(function (thread) {
                // if this thread is not exist in current threads array
                if (!_.contains(_this.threads, thread)) {
                    console.log('listen to : ' + thread.id);
                    _this.socket.on(thread.id, _this.updateMessage.bind(_this, _this.socket));
                }
            });
            _this.threads = newThreads;
        });
        this.userService.currentUser.subscribe(function (user) {
            _this.currentUser = new shared_1.User(user);
        });
        // Listen for user change status
        // this.userService.getManagerList().subscribe(data => {
        //     data.Items.forEach((user:any) => {
        //         this.socket.on(user.id, this.updateUserStatus.bind(this, this.socket));
        //     });
        // });
        // this.socket.on('user_status_change', this.updateUserStatus.bind(this, this.socket));
        this.socket.on('serve_request', this.serveRequest.bind(this, this.socket));
    }
    SocketService.prototype.start = function () {
    };
    SocketService.prototype.updateMessage = function (socket, data) {
        var _this = this;
        if (typeof (data.type) == "undefined" || data.type == shared_1.Message.MESSAGE_TYPE_TEXT) {
            var thread = _.find(this.threads, function (item) {
                return item.id == data.thread_id;
            });
            // if thread is null, create a new thread
            if (thread == null) {
                thread = new shared_1.Thread({
                    id: data.thread_id,
                    name: data.author.name,
                    is_sync: true
                });
            }
            var message = this.chatUtilService.convertMessageFromServer(data, thread, this.currentUser);
            this.messageService.newMessages.next(message);
            // Check if Chat App is not active, show notification
            if (!this.pageVisibilityService.isVisible() && this.optionService.data.is_notification) {
                this.notificationService.text(message.text);
            }
        }
        else {
            var thread = _.find(this.threads, function (item) {
                var thread_id = "";
                if (_this.currentUser.id < data.author.id)
                    thread_id = _this.currentUser.id + ':' + data.author.id;
                else
                    thread_id = data.author.id + ':' + _this.currentUser.id;
                return (item.id == thread_id || item.id == data.author.id);
            });
            if (thread) {
                thread.status = data.status;
                var text = "";
                if (data.status == shared_1.User.USER_STATUS_OFFLINE)
                    this.toastsService.success(thread.name + ' is now offline.');
                else if (data.status == shared_1.User.USER_STATUS_ONLINE)
                    this.toastsService.success(thread.name + ' is now online.');
            }
        }
    };
    // an imperative function call to this action stream
    SocketService.prototype.addMessage = function (message) {
        this.socket.emit('chat_message', message);
    };
    // mark thread as read
    SocketService.prototype.markThreadAsRead = function (thread) {
        this.socket.emit('mark_thread_as_read', thread, this.currentUser);
    };
    // private updateUserStatus(socket: any, data: any): void {
    //     console.log(data);
    //     var thread = _.find(this.threads, item => {
    //         var thread_id = "";
    //         if(this.currentUser.id < data.author.id)
    //             thread_id = this.currentUser.id + ':' + data.author.id;
    //         else
    //             thread_id = data.author.id + ':' + this.currentUser.id;
    //         return (item.id == thread_id || item.id == data.author.id );
    //     });
    //     if(thread)
    //     {
    //         thread.status = data.status;
    //         var text = "";
    //         if(data.status == User.USER_STATUS_OFFLINE)
    //             this.toastsService.success( thread.name +  ' is now offline.');
    //         else if(data.status == User.USER_STATUS_ONLINE)
    //             this.toastsService.success( thread.name +  ' is now online.');
    //     }
    // }
    SocketService.prototype.broadcastStatus = function (status) {
        var m = new shared_1.Message({
            author: this.currentUser,
            type: shared_1.Message.MESSAGE_TYPE_CHANGE_STATUS,
            status: status
        });
        this.socket.emit('chat_message', m);
        // this.socket.emit('user_status_change', {id: this.currentUser.id, status: status});
    };
    SocketService.prototype.serveRequest = function (socket, data) {
        console.log(data);
        var thread = new shared_1.Thread({
            id: data.thread.thread_id,
            name: data.user.name,
            is_sync: true
        });
        console.log('###########');
        console.log(thread);
        console.log(this.threads);
        // if this thread is not exist in current threads array
        var tempThread = _.find(this.threads, function (t) {
            return t.id == thread.id;
        });
        if (tempThread == null) {
            console.log('listen to : ' + data.thread.thread_id);
            this.threads.push(thread);
            this.socket.on(data.thread.thread_id, this.updateMessage.bind(this, this.socket));
        }
    };
    SocketService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(config_1.APP_CONFIG)), 
        __metadata('design:paramtypes', [Object, shared_1.MessageService, shared_1.ThreadService, shared_1.ChatUtilService, shared_1.UserService, shared_1.PushNotificationService, shared_1.PageVisibilityService, shared_1.OptionService, ng2_toastr_1.ToastsManager])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map