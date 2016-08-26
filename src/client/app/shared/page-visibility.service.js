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
var PageVisibilityService = (function () {
    function PageVisibilityService() {
        var _this = this;
        this._isVisible = true;
        if (typeof document.hidden !== "undefined") {
            this.hidden = "hidden";
            this.visibilityChange = "visibilitychange";
        }
        else if (typeof document["mozHidden"] !== "undefined") {
            this.hidden = "mozHidden";
            this.visibilityChange = "mozvisibilitychange";
        }
        else if (typeof document.msHidden !== "undefined") {
            this.hidden = "msHidden";
            this.visibilityChange = "msvisibilitychange";
        }
        else if (typeof document["webkitHidden"] !== "undefined") {
            this.hidden = "webkitHidden";
            this.visibilityChange = "webkitvisibilitychange";
        }
        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === "undefined" || typeof document[this.hidden] === "undefined") {
            console.log("This app requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
        }
        else {
            // Handle page visibility change   
            document.addEventListener(this.visibilityChange, function () {
                if (document[_this.hidden]) {
                    _this._isVisible = false;
                }
                else {
                    _this._isVisible = true;
                }
            }, false);
        }
    }
    PageVisibilityService.prototype.isVisible = function () {
        return this._isVisible;
    };
    PageVisibilityService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PageVisibilityService);
    return PageVisibilityService;
}());
exports.PageVisibilityService = PageVisibilityService;
//# sourceMappingURL=page-visibility.service.js.map