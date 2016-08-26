import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { JwtHelper } from '../../shared/angular2-jwt.service';
import { ToastsManager } from 'ng2-toastr';

import { ChatWindowComponent } from './+chat-window/index';

import {    UserService,
            ThreadService,
            MessageService,
            Message,
            Thread,
            User,
            SocketService,
            ChatUtilService,
            PushNotificationService } from '../../shared/index';

import { ContentHeaderService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'chat',
  directives: [
               ChatWindowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

    private currentUser: User;

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private threadsService: ThreadService,
        private jwtHelper: JwtHelper,
        private socketService: SocketService,
        private chatUtilService: ChatUtilService,
        private toastr: ToastsManager,
        private notification: PushNotificationService,
        private route: ActivatedRoute,
        private elRef: ElementRef,
        private contentHeaderService: ContentHeaderService
        ) {
        }

    ngOnInit(): void {

        this.chatUtilService.isSelectedChat = true;

        this.contentHeaderService.title = '';

        // if current use doesn't exist (because remmber jwt)
        this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

        this.route
        .params
        .subscribe(params => {
            let thread_id = params['id'];
            if(typeof(thread_id) !== 'undefined') {
                // Find thread in list thread
                // Check if this thread is not sync ( never load )
                this.threadsService.currentThread.subscribe(thread => {
                    // Refresh page
                    if(thread.id === null) {
                        var sub1 = this.threadsService.threads.subscribe(threads => {
                            var foundThread: Thread = null;
                            for(var i in threads) {
                                var t = threads[i];
                                if(t.type === Thread.THREAD_TYPE_ORDINARY) {
                                    if(threads[i].id === thread_id.replace('-', ':'))
                                        foundThread = threads[i];
                                } else {
                                    if(threads[i].id === thread_id)
                                        foundThread = threads[i];
                                }
                            }

                            if(foundThread !== null) {
                                if(typeof(sub1) !== 'undefined')
                                    sub1.unsubscribe();
                                this.threadsService.setCurrentThread(foundThread);
                            }
                        });
                    } else if(!thread.is_sync) {
                        // Get messages of logged in user with this user from server
                        this.messageService.getMessages(thread.id)
                            .subscribe((data) => {

                                var messages_server:Message[] = data.Items.map((message: any) => {
                                    return this.chatUtilService.convertMessageFromServer(message, thread, this.currentUser);
                                });

                                // Add messages into message service
                                this.messageService.updates.next((messages: Message[]) => {
                                        return messages.concat(messages_server);
                                    });
                            });

                        thread.is_sync = true;
                    }
                });
            }
        });
    }

    ngOnDestroy() {
        this.chatUtilService.isSelectedChat = false;
    }

}
