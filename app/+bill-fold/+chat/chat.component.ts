import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { JwtHelper } from 'angular2-jwt';
import { ToastsManager } from 'ng2-toastr';

import { ChatThreadsComponent } from './+chat-threads';
import { ChatWindowComponent } from './+chat-window';

import {    UserService,
            ThreadService,
            MessageService,
            Thread,
            Message,
            User,
            SocketService,
            ChatUtilService,
            PushNotificationService } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'chat',
  host : {
      '(window:resize)' : 'onResize()'  
    },
  directives: [ChatThreadsComponent,
               ChatWindowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit {

    private heightMain: number = 0;

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
        private elRef: ElementRef
        )
        {
        }

    ngOnInit(): void {
        console.log('chat init caledddddddddddddddd');

        this.route
        .params
        .subscribe(params => {
            let thread_id = params['id'];
            if(typeof(thread_id) !== 'undefined')
            {
                // Find thread in list thread
                // Check if this thread is not sync ( never load )
                let sup = this.threadsService.currentThread.subscribe(thread => {
                    if(!thread.is_sync)
                    {
                        // Get messages of logged in user with this user from server
                        this.messageService.getMessages(thread.id)
                            .subscribe((data) => {
                                
                                var messages_server:Message[] = data.Items.map((message: any) => {
                                    return this.chatUtilService.convertMessageFromServer(message, thread, currentUser);
                                });

                                // Add messages into message service
                                this.messageService.updates.next((messages: Message[]) => {
                                        return messages.concat(messages_server);
                                    });
                            });

                        thread.is_sync = true;
                    }
                });
                sup.unsubscribe();
            }
        });

        this.fixWindow();

        this.messageService.messages.subscribe(() => ({}));

        // set "Juliet" as the current user
        // this.userService.setCurrentUser(me);

        var currentUser: User;

        // if current use doesn't exist (because remmber jwt)
        var sup = this.userService.currentUser.subscribe(user => {
            // try to load current
            if(user == null)
            {
                var id_token = localStorage.getItem('id_token');
                var decode_toke = this.jwtHelper.decodeToken(id_token);
                currentUser = new User(
                        {
                            id: decode_toke.id, 
                            name: decode_toke.name,
                            logo: decode_toke.logo
                        }
                    );
                this.userService.setCurrentUser(currentUser);
            }
            else
            {
                currentUser = user;
            }
        });
        sup.unsubscribe();

        // create the initial messages
        // Get list user from server
        this.userService.getUserList().subscribe(data => {
            data.Items.forEach((user:any) => {
                var thread_name: string;
                if(user.id < currentUser.id)
                    thread_name = user.id + ':' + currentUser.id;
                else
                    thread_name = currentUser.id + ':' + user.id;

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

        this.toastr.success('Welcome back ' + currentUser.name);
        this.notification.create();

        this.socketService.start();
    }

    onResize() {
        this.fixWindow();
    }

    private fixWindow()
    {
        // console.log(this.elRef.nativeElement);
        // let elHeader = this.elRef.nativeElement.children[0];
        // let elFooter = this.elRef.nativeElement.children[3];
        // let elSidebar = this.elRef.nativeElement.children[1];
        // let elMain = this.elRef.nativeElement.children[2];
        // let elSidebarMenu = elSidebar.children[0];
        // let heightWindowInder = window.innerHeight;
        // this.heightMain = elMain.offsetHeight;
        // if(heightWindowInder >= (elHeader.offsetHeight + elFooter.offsetHeight + elSidebarMenu.offsetHeight))
        // {
        //     let minHeight = heightWindowInder - (elHeader.offsetHeight + elFooter.offsetHeight);      
        //     elMain.style.minHeight = minHeight + 'px';
        //     this.heightMain = elMain.offsetHeight;
        // }
    }

}
