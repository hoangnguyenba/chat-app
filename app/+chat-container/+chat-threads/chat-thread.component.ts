import { Component, OnInit, Input } from '@angular/core';

import { Thread, ThreadService, MessageService, SocketService, Message } from '../../shared';

@Component({
    selector: 'chat-thread',
    templateUrl: 'app/+chat-container/+chat-threads/chat-thread.component.html'
})
export class ChatThreadComponent implements OnInit {

    @Input() thread: Thread;
    selected: boolean = false;
    unreadMessagesCount: number;

    constructor(private threadService: ThreadService,
                private socketService: SocketService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {

        this.threadService.currentThread
        .subscribe( (currentThread: Thread) => {
            this.selected = currentThread &&
            this.thread &&
            (currentThread.id === this.thread.id);
        });

        this.messageService.messages.subscribe(messages => {
            this.unreadMessagesCount =
            _.reduce(
                messages,
                (sum: number, m: Message) => {
                let messageIsInCurrentThread: boolean = m.thread &&
                    this.thread &&
                    (this.thread.id === m.thread.id);
                if (m && !m.isRead && messageIsInCurrentThread) {
                    sum = sum + 1;
                }
                return sum;
                },
                0);
        })
    }

    clicked(event: any): void {
        // Ask server to save: I've read this thread
        if(this.unreadMessagesCount > 0)
            this.socketService.markThreadAsRead(this.thread);
            
        this.threadService.setCurrentThread(this.thread);
        event.preventDefault();
    }

}