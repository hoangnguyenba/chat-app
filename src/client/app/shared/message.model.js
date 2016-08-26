"use strict";
var user_model_1 = require("./user.model");
var Message = (function () {
    // work on data from server
    function Message(obj) {
        this.isRead = obj && obj.isRead || false;
        this.sentAt = obj && obj.sentAt || new Date();
        this.author = obj && obj.author || null;
        this.text = obj && obj.text || null;
        this.thread = obj && obj.thread || null;
        this.type = obj && obj.type || Message.MESSAGE_TYPE_TEXT;
        this.status = obj && obj.status || user_model_1.User.USER_STATUS_OFFLINE;
    }
    Object.defineProperty(Message, "MESSAGE_TYPE_TEXT", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message, "MESSAGE_TYPE_CHANGE_STATUS", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.model.js.map