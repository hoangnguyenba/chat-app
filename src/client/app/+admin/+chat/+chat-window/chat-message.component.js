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
var shared_1 = require('../../../shared');
var ChatMessageComponent = (function () {
    function ChatMessageComponent() {
        this.updatedLastAuthor = new core_1.EventEmitter();
    }
    ChatMessageComponent.prototype.ngDoCheck = function () {
        this.updatedLastAuthor.next(this.message.author);
    };
    ChatMessageComponent.prototype.isNewAuthor = function () {
        return this.lastAuthor == null || this.index == 0 || this.lastAuthor.id != this.message.author.id;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', shared_1.Message)
    ], ChatMessageComponent.prototype, "message", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', shared_1.User)
    ], ChatMessageComponent.prototype, "lastAuthor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChatMessageComponent.prototype, "index", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ChatMessageComponent.prototype, "length", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ChatMessageComponent.prototype, "updatedLastAuthor", void 0);
    ChatMessageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat-message',
            templateUrl: 'chat-message.component.html',
            styleUrls: ['chat-message.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], ChatMessageComponent);
    return ChatMessageComponent;
}());
exports.ChatMessageComponent = ChatMessageComponent;
//# sourceMappingURL=chat-message.component.js.map