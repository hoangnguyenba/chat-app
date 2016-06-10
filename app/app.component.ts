import {Component, OnInit} from '@angular/core';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';

import { ChatWindowComponent } from './chat-window/index';

import { UserService, ThreadService, MessageService, Thread, Message, User } from './shared';


@Component({
    selector: 'chat-app',
    template: '<chat-window></chat-window>',
    directives: [ChatWindowComponent],
    providers: [HTTP_PROVIDERS, UserService, MessageService, ThreadService]
})
export class AppComponent implements OnInit{

    constructor(private messageService: MessageService,
                private userService: UserService,
                private threadsService: ThreadService)
    {
    }

    ngOnInit(): void {
        // this.messageService.messages.subscribe(() => ({}));

        // set "Juliet" as the current user
        // this.userService.setCurrentUser(me);

        // create the initial messages
        this.messageService.getMessages('user1:user2').subscribe((data) => {
            var messages_server:Message[] = data.Items.map((item: any) => {

                var message: Message = new Message;
                message.sentAt = new Date(item.created_at);
                message.author = new User(item.author);
                message.text = item.text;
                message.thread = new Thread(item.thread_id);

                return message;
            });

            this.messageService.updates.next((messages: Message[]) => {
                return messages.concat(messages_server);
            });
        });


        this.threadsService.setCurrentThread(new Thread("user1:user2"));
    }
}
