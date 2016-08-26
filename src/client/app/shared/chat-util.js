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
var index_1 = require('./index');
// import { User } from './user.model';
var ChatUtilService = (function () {
    function ChatUtilService() {
    }
    ChatUtilService.prototype.convertMessageFromServer = function (message, thread, user) {
        return new index_1.Message({
            isRead: _.include(message.is_read, user.id),
            sentAt: message.created_at,
            author: new index_1.User(message.author),
            text: message.text,
            thread: thread
        });
    };
    ChatUtilService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChatUtilService);
    return ChatUtilService;
}());
exports.ChatUtilService = ChatUtilService;
//# sourceMappingURL=chat-util.js.map