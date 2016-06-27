import { Injectable } from '@angular/core';

@Injectable()
export class PageVisibilityService {
    private hidden: string;
    private visibilityChange: string;

    private _isVisible = true;

    constructor() { 
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
            this.hidden = "hidden";
            this.visibilityChange = "visibilitychange";
        } else if (typeof document["mozHidden"] !== "undefined") {
            this.hidden = "mozHidden";
            this.visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            this.hidden = "msHidden";
            this.visibilityChange = "msvisibilitychange";
        } else if (typeof document["webkitHidden"] !== "undefined") {
            this.hidden = "webkitHidden";
            this.visibilityChange = "webkitvisibilitychange";
        }

        // Warn if the browser doesn't support addEventListener or the Page Visibility API
        if (typeof document.addEventListener === "undefined" || typeof document[this.hidden] === "undefined") {
            console.log("This app requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
        } else {
            // Handle page visibility change   
            document.addEventListener(this.visibilityChange, () => {
                if (document[this.hidden]) {
                    this._isVisible = false;
                } else {
                    this._isVisible = true;
                }
            }, false);
        
        }
    }

    isVisible() {
        return this._isVisible;
    }
}