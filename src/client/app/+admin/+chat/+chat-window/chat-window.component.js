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
var common_1 = require('@angular/common');
var shared_1 = require('../../../shared');
var shared_2 = require('../../../shared');
var chat_message_component_1 = require('./chat-message.component');
var ChatWindowComponent = (function () {
    function ChatWindowComponent(messageService, threadService, userService, socketService, chatUtilService, el) {
        this.messageService = messageService;
        this.threadService = threadService;
        this.userService = userService;
        this.socketService = socketService;
        this.chatUtilService = chatUtilService;
        this.el = el;
        this.isPressEnter = true;
    }
    ChatWindowComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Calculate height of body box
        this.fixWindow();
        this.messages = this.threadService.currentThreadMessages;
        this.draftMessage = new shared_2.Message();
        this.threadService.currentThread.subscribe(function (thread) {
            _this.currentThread = thread;
        });
        this.userService.currentUser.subscribe(function (user) {
            _this.currentUser = new shared_2.User(user);
        });
        this.messages
            .subscribe(function (messages) {
            setTimeout(function () {
                _this.scrollToBottom();
            });
        });
    };
    ChatWindowComponent.prototype.onEnter = function (event) {
        if (!this.isPressEnter && !event.ctrlKey)
            return;
        this.sendMessage();
        event.preventDefault();
    };
    ChatWindowComponent.prototype.sendMessage = function () {
        var m = this.draftMessage;
        m.author = this.currentUser;
        m.thread = this.currentThread;
        m.isRead = true;
        // this.messageService.addMessage(m);
        this.socketService.addMessage(m);
        this.draftMessage = new shared_2.Message();
    };
    ChatWindowComponent.prototype.scrollToBottom = function () {
        var scrollPane = this.el
            .nativeElement.querySelector('#chat-box');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    };
    ChatWindowComponent.prototype.updateLastAuthor = function (author) {
        this.lastAuthor = author;
    };
    ChatWindowComponent.prototype.fixWindow = function () {
        var elHeader = this.el.nativeElement.children[0].children[0];
        var elBody = this.el.nativeElement.children[0].children[1];
        var elFooter = this.el.nativeElement.children[0].children[2];
        var minHeight = this.chatUtilService.mainHeight - (elHeader.offsetHeight + elFooter.offsetHeight + 60);
        elBody.style.height = minHeight + 'px';
    };
    ChatWindowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat-window',
            directives: [chat_message_component_1.ChatMessageComponent,
                common_1.FORM_DIRECTIVES],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: 'chat-window.component.html',
            styleUrls: ['chat-window.component.css']
        }), 
        __metadata('design:paramtypes', [shared_1.MessageService, shared_1.ThreadService, shared_1.UserService, shared_2.SocketService, shared_1.ChatUtilService, core_1.ElementRef])
    ], ChatWindowComponent);
    return ChatWindowComponent;
}());
exports.ChatWindowComponent = ChatWindowComponent;
//# sourceMappingURL=chat-window.component.js.map