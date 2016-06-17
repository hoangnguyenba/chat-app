import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config';

import { ThreadService, MessageService, Message, User, Thread } from '../shared';

declare var io: any;

@Injectable()
export class SocketService {

    private socket: any;

    constructor(@Inject(APP_CONFIG) private config:AppConfig,
                private messageService: MessageService,
                private threadService: ThreadService
                )
     { 
        this.socket = new io(this.config.apiEndpoint);
     }

    start(): void {
        this.socket.on("chat_message", this.updateMessage.bind(this, this.socket));
    }

    private updateMessage(socket: any, data: any): void {
        // this.threadService.threads.subscribe(thread => {
        //   console.log(thread);
        // });

        var message: Message = new Message(
            {
                isRead: false, 
                sentAt:data.created_at,
                author: new User(data.author),
                text: data.text,
                thread: new Thread({id:"user1:user2", name: 'Messi'})
            }
        );
        // console.log('#####################');
        // console.log(data);
        // console.log(message);
        this.messageService.newMessages.next(message);
    }

    // an imperative function call to this action stream
    addMessage(message: Message): void {
        this.socket.emit('chat_message', message);
    }

}