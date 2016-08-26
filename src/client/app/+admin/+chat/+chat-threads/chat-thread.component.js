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
var common_1 = require('@angular/common');
var shared_1 = require('../../../shared');
var ChatThreadComponent = (function () {
    function ChatThreadComponent(router, threadService, socketService, messageService) {
        this.router = router;
        this.threadService = threadService;
        this.socketService = socketService;
        this.messageService = messageService;
        this.selected = false;
    }
    ChatThreadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.threadService.currentThread
            .subscribe(function (currentThread) {
            _this.selected = currentThread &&
                _this.thread &&
                (currentThread.id === _this.thread.id);
        });
        this.messageService.messages.subscribe(function (messages) {
            _this.unreadMessagesCount =
                _.reduce(messages, function (sum, m) {
                    var messageIsInCurrentThread = m.thread &&
                        _this.thread &&
                        (_this.thread.id === m.thread.id);
                    if (m && !m.isRead && messageIsInCurrentThread) {
                        sum = sum + 1;
                    }
                    return sum;
                }, 0);
        });
    };
    ChatThreadComponent.prototype.clicked = function (event) {
        // Ask server to save: I've read this thread
        if (this.unreadMessagesCount > 0)
            this.socketService.markThreadAsRead(this.thread);
        this.threadService.setCurrentThread(this.thread);
        this.router.navigate(['/chat', this.thread.id.replace(':', '-')]);
        event.preventDefault();
    };
    ChatThreadComponent.prototype.status = function () {
        return {
            'text-green': this.thread.status == shared_1.User.USER_STATUS_ONLINE,
            'text-yellow': this.thread.status == shared_1.User.USER_STATUS_AWAY,
            'text-red': this.thread.status == shared_1.User.USER_STATUS_BUSY,
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', shared_1.Thread)
    ], ChatThreadComponent.prototype, "thread", void 0);
    ChatThreadComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat-thread',
            templateUrl: 'chat-thread.component.html',
            styleUrls: ['chat-thread.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [router_1.Router, shared_1.ThreadService, shared_1.SocketService, shared_1.MessageService])
    ], ChatThreadComponent);
    return ChatThreadComponent;
}());
exports.ChatThreadComponent = ChatThreadComponent;
//# sourceMappingURL=chat-thread.component.js.map