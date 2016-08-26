import { Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'chat-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(private viewContainerRef:ViewContainerRef) {}
}
