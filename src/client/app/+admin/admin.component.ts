import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router }  from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { ChatThreadsComponent } from './+chat/+chat-threads/index';

import { JwtHelper } from '../shared/angular2-jwt.service';
import { ToastsManager } from 'ng2-toastr';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/components/typeahead';
import { MODAL_DIRECTIVES } from 'ng2-bootstrap/components/modal';
import { ComponentsHelper } from 'ng2-bootstrap/components/utils/components-helper.service';
import { ContentHeaderService } from './shared/index';

import {
            UserService,
            ThreadService,
            MessageService,
            Thread,
            Message,
            User,
            SocketService,
            ChatUtilService,
            OptionService,
            TextService,
            AuthService } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css'],
    directives: [
                ChatThreadsComponent,
                DROPDOWN_DIRECTIVES,
                MODAL_DIRECTIVES,
                TAB_DIRECTIVES,
                TYPEAHEAD_DIRECTIVES,
                CORE_DIRECTIVES],
    viewProviders: [{provide: ComponentsHelper, useClass: ComponentsHelper}],
    providers: [ContentHeaderService]
})
export class AdminComponent implements OnInit {

    showClassToggle: boolean = false;
    showMiniAvatar: boolean = false;
    private heightMain: number = 0;
    private currentUser: User;
    private unreadServeMessagesCount: number = 0;

    @HostListener('window:resize') onResize() {
        this.fixWindow();
    }

    constructor(
        private router: Router,
        private jwtHelper: JwtHelper,
        private messageService: MessageService,
        private userService: UserService,
        private threadsService: ThreadService,
        private socketService: SocketService,
        private chatUtilService: ChatUtilService,
        private optionService: OptionService,
        private textService: TextService,
        private toastsService: ToastsManager,
        private contentHeaderService: ContentHeaderService,
        private authService: AuthService,
        private elRef: ElementRef) {
        }

    ngOnInit() {
        this.fixWindow();

        this.messageService.messages.subscribe(() => ({}));

        // if current use doesn't exist (because remmber jwt)
        this.userService.currentUser.subscribe(user => {
            // try to load current
            if (user === null) {
                var id_token = localStorage.getItem('id_token');
                var decode_toke = this.jwtHelper.decodeToken(id_token);
                this.currentUser = new User(
                        {
                            id: decode_toke.id,
                            name: decode_toke.name,
                            logo: decode_toke.logo,
                            status: User.USER_STATUS_ONLINE,
                            type: User.USER_TYPE_MANAGER
                        }
                    );
                this.userService.setCurrentUser(this.currentUser);
            } else {
                this.currentUser = user;
            }
        });

        // create the initial messages
        // Get list user from server
        this.userService.getManagerList().subscribe(data => {
            data.Items.forEach((user:any) => {
                var thread_name: string;
                if(user.id < this.currentUser.id) {
                    thread_name = user.id + ':' + this.currentUser.id;
                } else {
                    thread_name = this.currentUser.id + ':' + user.id;
                }
                // With every user, create a new thread
                var thread: Thread = new Thread(
                    {
                        id: thread_name,
                        name: user.name
                    });

                if(user.hasOwnProperty('status')) {
                    thread.status = user.status;
                } else {
                    thread.status = User.USER_STATUS_OFFLINE;
                }

                // create an empty message ( for add thread )
                let messages_server = [new Message({
                            isRead: true,
                            thread: thread
                        })];

                // Add messages into message service
                this.messageService.updates.next((messages: Message[]) => {
                        return messages.concat(messages_server);
                    });
            });
        });


        // Get list thread from server
        this.threadsService.getThreadList().subscribe(data => {
            if(_.isEmpty(data))
                return;
            data.forEach((threadServer:any) => {
                var thread_name: string = threadServer.thread_id;
                // var thread: Thread = new Thread(threadServer);
                var thread: Thread = new Thread(
                {
                    id: thread_name,
                    name: threadServer.name,
                    status: User.USER_STATUS_ONLINE,
                    serve_status: threadServer.serve_status
                });

                let messages_server = [new Message({
                            isRead: true,
                            thread: thread
                        })];

                // Add messages into message service
                this.messageService.updates.next((messages: Message[]) => {
                        return messages.concat(messages_server);
                    });
            });
        });


        // create the initial messages
        // Get list user from server
        this.userService.getUserOnline().subscribe(data => {
            data.Items.forEach((user:any) => {
                // With every user, create a new thread
                var tempMessage = new Message({
                    isRead: true,
                    author: new User({
                        id: user.id,
                        name: user.name,
                        status: user.status,
                        type: User.USER_TYPE_ORDINARY
                    }),
                    sentAt: user.last_message_time,
                    text: user.last_message
                });

                var thread: Thread = new Thread(
                    {
                        id: user.id,
                        name: user.name,
                        type: Thread.THREAD_TYPE_SERVE,
                        serve_status: user.serve_status,
                        lastMessage: tempMessage
                    });

                if(user.hasOwnProperty('status')) {
                    thread.status = user.status;
                } else {
                    thread.status = User.USER_STATUS_OFFLINE;
                }

                // create an empty message ( for add thread )
                let messages_server = [new Message({
                            isRead: true,
                            thread: thread
                        })];

                // Add messages into message service
                this.messageService.updates.next((messages: Message[]) => {
                        return messages.concat(messages_server);
                    });

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
            });
        });

        this.messageService.messages
        .combineLatest(
            this.threadsService.currentThread,
            (messages: Message[], currentThread: Thread) =>
            [currentThread, messages] )

        .subscribe(([currentThread, messages]: [Thread, Message[]]) => {

            this.unreadServeMessagesCount =
            _.reduce(
                messages,
                (sum: number, m: Message) => {
                let messageIsInCurrentThread: boolean = this.chatUtilService.isSelectedChat &&
                    m.thread &&
                    currentThread &&
                    (currentThread.id === m.thread.id);
                if (m && !m.isRead &&
                    !messageIsInCurrentThread &&
                    m.thread.type === Thread.THREAD_TYPE_SERVE &&
                    m.type === Message.MESSAGE_TYPE_TEXT) {
                    sum = sum + 1;
                }
                return sum;
                },
                0);
        });

        this.toastsService.success('Welcome back ' + this.currentUser.name);
    }

    public logout() {
        this.authService.logout();
    }

    status(): any {
        return {
            'text-green': this.currentUser.status === User.USER_STATUS_ONLINE,
            'text-yellow': this.currentUser.status === User.USER_STATUS_AWAY,
            'text-red': this.currentUser.status === User.USER_STATUS_BUSY
        };
    }

    statusText(): string {
        if(this.currentUser.status === User.USER_STATUS_ONLINE)
            return 'Online';
        if(this.currentUser.status === User.USER_STATUS_AWAY)
            return 'Away';
        if(this.currentUser.status === User.USER_STATUS_BUSY)
            return 'Busy';
        return 'Offline';
    }

    changeStatus(status: number) {
        this.currentUser.status = status;
        // Broadcast to server
        this.socketService.broadcastStatus(this.currentUser.status);
    }

    searchUserOnSelect(user: any) {
        var thread_id = '';
        if(this.currentUser.id < user.item.id) {
            thread_id = this.currentUser.id + '-' + user.item.id;
        } else {
            thread_id = user.item.id + '-' + this.currentUser.id;
        }
        this.router.navigate(['/chat/' + thread_id]);

    }

    public getClass() {
        if (this.showClassToggle) {
            return 'sidebar-collapse';
        } else {
            return '';
        }
    }

    public addCssElementAvatar() {
        if (this.showClassToggle) {
            return 'avatar-size';
        } else {
            return '';
        }
    }

    private fixWindow() {
        let elHeader = this.elRef.nativeElement.children[0].children[0];
        let elFooter = this.elRef.nativeElement.children[0].children[3];
        let elSidebar = this.elRef.nativeElement.children[0].children[1];
        let elMain = this.elRef.nativeElement.children[0].children[2];
        let elSidebarMenu = elSidebar.children[0];

        let heightWindowInder = window.innerHeight;
        this.heightMain = elMain.offsetHeight;
        if(heightWindowInder >= (elHeader.offsetHeight + elFooter.offsetHeight + elSidebarMenu.offsetHeight)) {
            let minHeight = heightWindowInder - (elHeader.offsetHeight + elFooter.offsetHeight + 30);
            elMain.style.minHeight = minHeight + 'px';

            elMain.children[1].style.minHeight = (minHeight - elMain.children[0].offsetHeight) + 'px';

            this.heightMain = minHeight - elMain.children[0].offsetHeight;

            this.chatUtilService.mainHeight = this.heightMain;
        }
    }
}
