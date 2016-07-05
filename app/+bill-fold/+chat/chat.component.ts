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
        private elRef: ElementRef
        )
        {
        }

    ngOnInit(): void {
        console.log('chat init caledddddddddddddddd');

        // if current use doesn't exist (because remmber jwt)
        this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

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
                sup.unsubscribe();
            }
        });

        this.fixWindow();
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
