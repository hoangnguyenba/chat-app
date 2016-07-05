import { Component, OnInit, ElementRef } from '@angular/core';

import { ROUTER_DIRECTIVES }  from '@angular/router';
import { ChatThreadsComponent } from './+chat/+chat-threads';

@Component({
    moduleId: module.id,
    selector: 'bill-fold',
    // template: '<router-outlet></router-outlet>',
    templateUrl: 'bill-fold.component.html',
    styleUrls: ['bill-fold.component.css'],
    directives: [ROUTER_DIRECTIVES, ChatThreadsComponent]
})
export class BillFoldComponent implements OnInit {
    private heightMain: number = 0;
    constructor(private elRef: ElementRef) { }

    ngOnInit() { 
        this.fixWindow();
    }

    private fixWindow()
    {
        console.log(this.elRef.nativeElement);
        let elHeader = this.elRef.nativeElement.children[0];
        let elFooter = this.elRef.nativeElement.children[3];
        let elSidebar = this.elRef.nativeElement.children[1];
        let elMain = this.elRef.nativeElement.children[2];
        let elSidebarMenu = elSidebar.children[0];
        let heightWindowInder = window.innerHeight;
        this.heightMain = elMain.offsetHeight;
        if(heightWindowInder >= (elHeader.offsetHeight + elFooter.offsetHeight + elSidebarMenu.offsetHeight))
        {
            let minHeight = heightWindowInder - (elHeader.offsetHeight + elFooter.offsetHeight);      
            elMain.style.minHeight = minHeight + 'px';

            console.log(elMain.offsetHeight);
            console.log(elMain.children[0].offsetHeight);

            elMain.children[1].style.minHeight = elMain.offsetHeight - elMain.children[0].offsetHeight;

            this.heightMain = elMain.offsetHeight;
        }
    }

}