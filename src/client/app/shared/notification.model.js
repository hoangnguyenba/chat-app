"use strict";
var ServeRequest = (function () {
    function ServeRequest() {
    }
    return ServeRequest;
}());
exports.ServeRequest = ServeRequest;
(function (NotificationEnum) {
    NotificationEnum[NotificationEnum["ServeRequest"] = 0] = "ServeRequest";
})(exports.NotificationEnum || (exports.NotificationEnum = {}));
var NotificationEnum = exports.NotificationEnum;
var AppNotification = (function () {
    function AppNotification(obj) {
        this.id = obj && obj.id || null;
        this.type = obj && obj.type || AppNotification.NOTIFICATION_TYPE_SERVE_REQUEST;
    }
    Object.defineProperty(AppNotification, "NOTIFICATION_TYPE_SERVE_REQUEST", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    return AppNotification;
}());
exports.AppNotification = AppNotification;
//# sourceMappingURL=notification.model.js.map