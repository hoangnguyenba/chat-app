import { Component, OnInit, Input } from '@angular/core';

import { Thread, ThreadService } from '../../shared';

@Component({
    selector: 'chat-thread',
    templateUrl: 'app/chat-container/chat-threads/chat-thread.component.html'
})
export class ChatThreadComponent implements OnInit {

    @Input() thread: Thread;
    selected: boolean = false;

    constructor(public threadService: ThreadService) {
    }

    ngOnInit(): void {
        this.threadService.currentThread
        .subscribe( (currentThread: Thread) => {
            this.selected = currentThread &&
            this.thread &&
            (currentThread.id === this.thread.id);
        });
    }

    clicked(event: any): void {
        this.threadService.setCurrentThread(this.thread);
        event.preventDefault();
    }

}