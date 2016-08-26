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
var config_1 = require('../../../config');
var shared_1 = require('../../../shared');
var chat_thread_component_1 = require('./chat-thread.component');
var ChatThreadsComponent = (function () {
    function ChatThreadsComponent(threadService, messageService, textService, config) {
        this.threadService = threadService;
        this.messageService = messageService;
        this.textService = textService;
        this.config = config;
        this.threads = threadService.orderedThreads;
    }
    ChatThreadsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.messages
            .combineLatest(this.threadService.currentThread, function (messages, currentThread) {
            return [currentThread, messages];
        })
            .subscribe(function (_a) {
            var currentThread = _a[0], messages = _a[1];
            _this.unreadMessagesCount =
                _.reduce(messages, function (sum, m) {
                    var messageIsInCurrentThread = m.thread &&
                        currentThread &&
                        (currentThread.id === m.thread.id);
                    if (m && !m.isRead && !messageIsInCurrentThread) {
                        sum = sum + 1;
                    }
                    return sum;
                }, 0);
            // Update title of app
            if (_this.unreadMessagesCount > 0)
                document.title = "(" + _this.unreadMessagesCount + ") " + _this.config.title;
            else
                document.title = _this.config.title;
        });
    };
    ChatThreadsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat-threads',
            directives: [chat_thread_component_1.ChatThreadComponent],
            templateUrl: 'chat-threads.component.html',
            styleUrls: ['chat-threads.component.css']
        }),
        __param(3, core_1.Inject(config_1.APP_CONFIG)), 
        __metadata('design:paramtypes', [shared_1.ThreadService, shared_1.MessageService, shared_1.TextService, Object])
    ], ChatThreadsComponent);
    return ChatThreadsComponent;
}());
exports.ChatThreadsComponent = ChatThreadsComponent;
//# sourceMappingURL=chat-threads.component.js.map