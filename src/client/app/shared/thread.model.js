"use strict";
var user_model_1 = require('./user.model');
// 3 type of thread: 
// + Thread for client: thread_id = user_id
// + Thread for admin vs admin: thread_id = user1_id:user2_id
// + Thread for multi chat: thread_id = "something"
var Thread = (function () {
    function Thread(obj) {
        this.id = obj && obj.id || null;
        this.name = obj && obj.name || null;
        this.status = obj && obj.status || user_model_1.User.USER_STATUS_ONLINE;
        this.is_sync = obj && obj.is_sync || false;
    }
    return Thread;
}());
exports.Thread = Thread;
//# sourceMappingURL=thread.model.js.map