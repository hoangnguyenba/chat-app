import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config';

import { ThreadService, MessageService, ChatUtilService, Message, User, Thread } from '../shared';

import * as _ from 'underscore';

declare var io: any;

@Injectable()
export class SocketService {

    // store list of threads, every time we get a message from server
    // find the correct Thread in this array
    private threads: Thread[];

    private socket: any;

    constructor(@Inject(APP_CONFIG) private config:AppConfig,
                private messageService: MessageService,
                private threadService: ThreadService,
                private chatUtilService: ChatUtilService
                )
     { 
        this.socket = new io(this.config.apiEndpoint);

        this.threadService.threads.subscribe(threadGroups => {
            this.threads = _.values(threadGroups);
        });
     }

    start(): void {
        this.socket.on("chat_message", this.updateMessage.bind(this, this.socket));
    }

    private updateMessage(socket: any, data: any): void {

        var thread = _.find(this.threads, item => {
            return item.id == data.thread_id;
        })

        var message = this.chatUtilService.convertMessageFromServer(data, thread);
        this.messageService.newMessages.next(message);
    }

    // an imperative function call to this action stream
    addMessage(message: Message): void {
        this.socket.emit('chat_message', message);
    }

}