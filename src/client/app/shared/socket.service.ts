import { Injectable, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';

import { APP_CONFIG, AppConfig } from '../config';
import { ToastsManager } from 'ng2-toastr';
import { ThreadService, MessageService, UserService, ChatUtilService, Message, User, Thread,
    PushNotificationService,
    PageVisibilityService,
    OptionService
} from '../shared/index';

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
                private userService: UserService,
                private notificationService: PushNotificationService,
                private pageVisibilityService: PageVisibilityService,
                private optionService: OptionService,
                private toastsService: ToastsManager
                ) {
        this.socket = new io(this.config.apiEndpoint);

        this.threadService.threads.subscribe(threadGroups => {
            var newThreads = _.values(threadGroups);
            newThreads.forEach(thread => {
                // if this thread is not exist in current threads array
                if(!_.contains(this.threads, thread)) {
                    this.socket.on(thread.id, this.updateMessage.bind(this, this.socket));
                }
            });
            this.threads = newThreads;
        });

        this.userService.currentUser.subscribe((user) => {
            this.currentUser = new User(user);
        });

        // Listen for user change status
        this.userService.getManagerList().subscribe(data => {
            data.Items.forEach((user:any) => {
                this.socket.on(user.id, this.updateMessage.bind(this, this.socket));
            });
        });

        this.messageService.newMessages
            .combineLatest(this.threadService.currentThread).subscribe( data => {
                if(data[0].isRead && data[0].thread.id === data[1].id && this.chatUtilService.isSelectedChat)
                {
                    this.socket.emit('mark_thread_as_read', data[1], this.currentUser);
                }
            });

        this.socket.on('serve_request', this.serveRequest.bind(this, this.socket));
     }

    // an imperative function call to this action stream
    addMessage(message: Message): void {
        this.socket.emit('chat_message', message);
    }

    // mark thread as read
    markThreadAsRead(thread: Thread): void {
        this.socket.emit('mark_thread_as_read', thread, this.currentUser);
    }

    public broadcastStatus(status: number): void {
        var m = new Message({
            author: this.currentUser,
            type: Message.MESSAGE_TYPE_CHANGE_USER_STATUS,
            status: status
        });
        this.socket.emit('chat_message', m);
    }

    private serveRequest(socket: any, data: any): void {
        var thread = new Thread({
            id: data.thread.thread_id,
            name: data.user.name,
            type: data.thread.type,
            is_sync: true
        });
        // if this thread is not exist in current threads array
        var tempThread = _.find(this.threads, t => {
            return t.id === thread.id;
        });
        if (tempThread === undefined) {
            this.threads.push(thread);
            this.socket.on(data.thread.thread_id, this.updateMessage.bind(this, this.socket));

            // create an empty message ( for add thread )
            let messages_server = [new Message({
                        isRead: true,
                        thread: thread
                    })];

            // Add messages into message service
            this.messageService.updates.next((messages: Message[]) => {
                    return messages.concat(messages_server);
                });
        }
    }

    private updateMessage(socket: any, data: any): void {
        if( typeof(data.type) === 'undefined' || data.type === Message.MESSAGE_TYPE_TEXT) {

            var thread = _.find(this.threads, item => {
                return item.id === data.thread_id;
            });
            // if thread is null, create a new thread
            if(thread === null) {
                thread = new Thread({
                    id: data.thread_id,
                    name: data.author.name,
                    is_sync: true
                });
            }

            var message = this.chatUtilService.convertMessageFromServer(data, thread, this.currentUser);
            this.messageService.newMessages.next(message);

            // Check if Chat App is not active, show notification
            if(!this.pageVisibilityService.isVisible() && this.optionService.data.is_notification) {
                this.notificationService.text(message.text);
            }
        } else if (data.type === Message.MESSAGE_TYPE_CHANGE_USER_STATUS) {

            var thread = _.find(this.threads, item => {
                var thread_id = '';
                if(this.currentUser.id < data.author.id) {
                    thread_id = this.currentUser.id + ':' + data.author.id;
                } else {
                    thread_id = data.author.id + ':' + this.currentUser.id;
                }
                return (item.id === thread_id || item.id === data.author.id );
            });

            if (thread) {
                thread.status = data.status;
                if(data.status === User.USER_STATUS_OFFLINE) {
                    this.toastsService.success( thread.name +  ' is now offline.');
                } else if(data.status === User.USER_STATUS_ONLINE) {
                    this.toastsService.success( thread.name +  ' is now online.');
                }
            }

            var message = this.chatUtilService.convertMessageFromServer(data, thread, this.currentUser);
            this.messageService.newMessages.next(message);
        } else if (data.type === Message.MESSAGE_TYPE_CHANGE_THREAD_STATUS) {
            var thread = _.find(this.threads, item => {
                return item.id === data.thread_id;
            });
            thread.serve_status = data.status;
            var message = this.chatUtilService.convertMessageFromServer(data, thread, this.currentUser);
            this.messageService.newMessages.next(message);
        } else if(data.type === Message.MESSAGE_TYPE_MARK_THREAD_AS_READ) {
            console.log(data);
            console.log(this.currentUser);
            Observable.create(function(){

            });
            if(data.author.id !== this.currentUser.id)
                this.messageService.markThreadAsRead.next(new Thread({id: data.thread_id}));
        }
    }
}
