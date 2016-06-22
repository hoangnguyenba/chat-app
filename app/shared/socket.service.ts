import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../config';

import { ThreadService, MessageService, UserService, ChatUtilService, Message, User, Thread } from '../shared';

import * as _ from 'underscore';

declare var io: any;

@Injectable()
export class SocketService {

    // store list of threads, every time we get a message from server
    // find the correct Thread in this array
    private threads: Thread[];
    private currentUser: User;

    private socket: any;

    constructor(@Inject(APP_CONFIG) private config:AppConfig,
                private messageService: MessageService,
                private threadService: ThreadService,
                private chatUtilService: ChatUtilService,
                private userService: UserService
                )
     { 
        this.socket = new io(this.config.apiEndpoint);

        this.threadService.threads.subscribe(threadGroups => {
            var newThreads = _.values(threadGroups);
            newThreads.forEach(thread => {
                // if this thread is not exist in current threads array
                if(!_.contains(this.threads, thread)){
                    this.socket.on(thread.id, this.updateMessage.bind(this, this.socket));
                }
            });
            this.threads = newThreads;
        });

        this.userService.currentUser.subscribe((user) => {
            this.currentUser = new User(user);
        });
     }

    start(): void {
    }

    private updateMessage(socket: any, data: any): void {

        var thread = _.find(this.threads, item => {
            return item.id == data.thread_id;
        });

        var message = this.chatUtilService.convertMessageFromServer(data, thread, this.currentUser);
        this.messageService.newMessages.next(message);
    }

    // an imperative function call to this action stream
    addMessage(message: Message): void {
        this.socket.emit('chat_message', message);
    }

    // mark thread as read
    markThreadAsRead(thread: Thread): void {
        this.socket.emit('mark_thread_as_read', thread, this.currentUser);
    }
}