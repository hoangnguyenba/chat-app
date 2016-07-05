import { Component, OnInit, ElementRef } from '@angular/core';

import { ROUTER_DIRECTIVES }  from '@angular/router';
import { ChatThreadsComponent } from './+chat/+chat-threads';

import { JwtHelper } from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr';

import {    UserService,
            ThreadService,
            MessageService,
            Thread,
            Message,
            User,
            SocketService,
            ChatUtilService,
            PushNotificationService } from '../shared';

@Component({
    moduleId: module.id,
    selector: 'bill-fold',
    // template: '<router-outlet></router-outlet>',
    templateUrl: 'bill-fold.component.html',
    styleUrls: ['bill-fold.component.css'],
    directives: [ROUTER_DIRECTIVES, ChatThreadsComponent],
    host : {
      '(window:resize)' : 'onResize()'  
    }
})
export class BillFoldComponent implements OnInit {
    private heightMain: number = 0;
    private currentUser: User;
    constructor(
        private jwtHelper: JwtHelper,
        private messageService: MessageService,
        private userService: UserService,
        private threadsService: ThreadService,
        private socketService: SocketService,
        private chatUtilService: ChatUtilService,
        private toastr: ToastsManager,
        private elRef: ElementRef) { 
            console.log('########begin 1######');
            console.log('########end 1######');
        }

    ngOnInit() { 
        console.log('########begin######');
        this.fixWindow();

        this.messageService.messages.subscribe(() => ({}));

        // if current use doesn't exist (because remmber jwt)
        this.userService.currentUser.subscribe(user => {
            // try to load current
            if(user == null)
            {
                var id_token = localStorage.getItem('id_token');
                var decode_toke = this.jwtHelper.decodeToken(id_token);
                this.currentUser = new User(
                        {
                            id: decode_toke.id, 
                            name: decode_toke.name,
                            logo: decode_toke.logo
                        }
                    );
                this.userService.setCurrentUser(this.currentUser);
            }
            else
            {
                this.currentUser = user;
            }
        });

        // create the initial messages
        // Get list user from server
        this.userService.getUserList().subscribe(data => {
            data.Items.forEach((user:any) => {
                var thread_name: string;
                if(user.id < this.currentUser.id)
                    thread_name = user.id + ':' + this.currentUser.id;
                else
                    thread_name = this.currentUser.id + ':' + user.id;

                // With every user, create a new thread
                var thread: Thread = new Thread(
                    {
                        id: thread_name,
                        name: user.name
                    });

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
            data.forEach((threadServer:any) => {
                var thread_name: string = threadServer.thread_id;
                // var thread: Thread = new Thread(threadServer);
                var thread: Thread = new Thread(
                {
                    id: thread_name,
                    name: threadServer.name
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

        this.toastr.success('Welcome back ' + this.currentUser.name);

        this.socketService.start();

        console.log('########end######');
    }

    onResize() {
        this.fixWindow();
    }

    private fixWindow()
    {
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

            elMain.children[1].style.minHeight = (minHeight - elMain.children[0].offsetHeight) + 'px';

            this.heightMain = minHeight - elMain.children[0].offsetHeight;

            this.chatUtilService.mainHeight = this.heightMain;
        }
    }

}