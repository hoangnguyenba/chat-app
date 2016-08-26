"use strict";
var NotificationConfig = (function () {
    function NotificationConfig(config) {
        if (config === void 0) { config = {}; }
        this.title = "Notification";
        this.body = "";
        this.icon = "/favicon.ico";
        this.dir = 'auto';
        this.lang = 'en-US';
        this.renotify = false;
        this.sticky = false;
        this.noscreen = false;
        this.silent = true;
        this.closeDelay = 0;
        this.title = config.title || this.title;
        this.body = config.body || this.body;
        this.icon = config.icon || this.icon;
        this.sound = config.sound || this.sound;
        this.data = config.data || this.data;
        this.tag = config.tag || this.tag;
        this.dir = config.dir || this.dir;
        this.lang = config.lang || this.lang;
        this.renotify = config.renotify || this.renotify;
        this.sticky = config.sticky || this.sticky;
        this.vibrate = config.vibrate || this.vibrate;
        this.noscreen = config.noscreen || this.noscreen;
        this.silent = config.silent || this.silent;
        this.closeDelay = config.closeDelay || this.closeDelay;
    }
    NotificationConfig.prototype.getConfig = function () {
        return {
            title: this.title,
            body: this.body,
            icon: this.icon,
            sound: this.sound,
            data: this.data,
            tag: this.tag,
            dir: this.dir,
            lang: this.lang,
            renotify: this.renotify,
            sticky: this.sticky,
            vibrate: this.vibrate,
            noscreen: this.noscreen,
            silent: this.silent,
            closeDelay: this.closeDelay
        };
    };
    NotificationConfig.prototype.mergeConfig = function (config) {
        return {
            title: config.title || this.title,
            body: config.body || this.body,
            icon: config.icon || this.icon,
            sound: config.sound || this.sound,
            data: this.data || config.data,
            tag: config.tag || this.tag,
            dir: config.dir || this.dir,
            lang: config.lang || this.lang,
            renotify: config.renotify || this.renotify,
            sticky: config.sticky || this.sticky,
            vibrate: config.vibrate || this.vibrate,
            noscreen: config.noscreen || this.noscreen,
            silent: config.silent || this.silent,
            closeDelay: config.closeDelay || this.closeDelay
        };
    };
    return NotificationConfig;
}());
exports.NotificationConfig = NotificationConfig;
var PushNotificationService = (function () {
    function PushNotificationService(notificationConfig) {
        this.onShow = null;
        this.onClose = null;
        this.onError = null;
        this.onClick = null;
        if (!this.checkCompatibility()) {
            console.log('Notification API not available in this browser.');
        }
        else {
            PushNotificationService._isCompatibility = true;
            // Assign options
            this._config = notificationConfig.getConfig();
            this.requestPermission(function (permission) {
                if (permission === PushNotificationService.GRANTED) {
                    PushNotificationService._isPermissionGranted = true;
                }
            });
        }
    }
    Object.defineProperty(PushNotificationService, "DEFAULT", {
        get: function () { return "default"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PushNotificationService, "GRANTED", {
        get: function () { return "granted"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PushNotificationService, "DENIED", {
        get: function () { return "denied"; },
        enumerable: true,
        configurable: true
    });
    PushNotificationService.prototype.checkCompatibility = function () {
        return !!('Notification' in window);
    };
    Object.defineProperty(PushNotificationService, "isCompatibility", {
        get: function () {
            return PushNotificationService._isCompatibility;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PushNotificationService, "isPermissionGranted", {
        get: function () {
            return PushNotificationService._isPermissionGranted;
        },
        enumerable: true,
        configurable: true
    });
    PushNotificationService.prototype.requestPermission = function (callback) {
        return Notification.requestPermission(callback);
    };
    PushNotificationService.prototype.create = function (config) {
        if (PushNotificationService.isCompatibility && PushNotificationService.isPermissionGranted) {
            // Need merge options here
            var tempConfig;
            if (config) {
                tempConfig = config.mergeConfig(this._config);
            }
            else {
                tempConfig = this._config;
            }
            var notification = new Notification(tempConfig.title, {
                dir: tempConfig.dir,
                lang: tempConfig.lang,
                data: tempConfig.data,
                tag: tempConfig.tag,
                body: tempConfig.body,
                icon: tempConfig.icon,
                silent: tempConfig.silent,
                sound: tempConfig.sound,
                renotify: tempConfig.renotify,
                sticky: tempConfig.sticky,
                vibrate: tempConfig.vibrate,
                noscreen: tempConfig.noscreen
            });
            this.attachEventHandlers(notification);
            this.close(notification);
            return notification;
        }
    };
    PushNotificationService.prototype.text = function (text) {
        this.create(new NotificationConfig({
            body: text
        }));
    };
    PushNotificationService.prototype.close = function (notification) {
        if (this._config.closeDelay) {
            setTimeout(function () {
                notification.close();
            }, this._config.closeDelay);
        }
        else {
            notification.close();
        }
    };
    PushNotificationService.closeAll = function () {
        Notification.close();
    };
    PushNotificationService.prototype.attachEventHandlers = function (notification) {
        var _this = this;
        notification.onshow = function () { return _this.onShow; };
        notification.onclick = function (event) { return _this.onClick; };
        notification.onerror = function () { return _this.onError; };
        notification.onclose = function () { return _this.onClose; };
    };
    PushNotificationService._isCompatibility = false;
    PushNotificationService._isPermissionGranted = false;
    return PushNotificationService;
}());
exports.PushNotificationService = PushNotificationService;
//# sourceMappingURL=push-notification.service.js.map