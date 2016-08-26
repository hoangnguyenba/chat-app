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
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/combineLatest');
var angular2_jwt_1 = require('angular2-jwt');
var config_1 = require('../config');
var shared_1 = require('../shared');
var _ = require('underscore');
var ThreadService = (function () {
    function ThreadService(messageService, authHttp, config) {
        this.messageService = messageService;
        this.authHttp = authHttp;
        this.config = config;
        // `currentThread` contains the currently selected thread
        this.currentThread = new BehaviorSubject_1.BehaviorSubject(new shared_1.Thread());
        this.threads = messageService.messages
            .map(function (messages) {
            var threads = {};
            // Store the message's thread in our accumulator `threads`
            messages.map(function (message) {
                threads[message.thread.id] = threads[message.thread.id] ||
                    message.thread;
                // Cache the most recent message for each thread
                var messagesThread = threads[message.thread.id];
                if (!messagesThread.lastMessage ||
                    messagesThread.lastMessage.sentAt < message.sentAt) {
                    // can't assign messagesThread.lastMessage = message
                    var temp = new shared_1.Message();
                    temp.author = message.author;
                    temp.isRead = message.isRead;
                    temp.sentAt = message.sentAt;
                    messagesThread.lastMessage = temp;
                }
            });
            return threads;
        });
        this.orderedThreads = this.threads
            .map(function (threadGroups) {
            var threads = _.values(threadGroups);
            return _.sortBy(threads, function (t) { return t.id; });
        });
        this.currentThreadMessages = this.currentThread
            .combineLatest(messageService.messages, function (currentThread, messages) {
            if (currentThread && messages.length > 0) {
                return _.chain(messages)
                    .filter(function (message) {
                    return (message.thread.id === currentThread.id);
                })
                    .map(function (message) {
                    message.isRead = true;
                    return message;
                })
                    .value();
            }
            else {
                return [];
            }
        });
        this.currentThread.subscribe(this.messageService.markThreadAsRead);
    }
    ThreadService.prototype.setCurrentThread = function (newThread) {
        this.currentThread.next(newThread);
    };
    ThreadService.prototype.getThreadList = function () {
        return this.authHttp.get(this.config.apiEndpoint + 'threads').map(function (res) {
            return _.isEmpty(res.json()) ? {} : res.json().Responses.Thread;
        });
    };
    ThreadService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(config_1.APP_CONFIG)), 
        __metadata('design:paramtypes', [shared_1.MessageService, angular2_jwt_1.AuthHttp, Object])
    ], ThreadService);
    return ThreadService;
}());
exports.ThreadService = ThreadService;
//# sourceMappingURL=thread.service.js.map