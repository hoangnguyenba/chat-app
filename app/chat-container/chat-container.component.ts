import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { JwtHelper } from 'angular2-jwt';

import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

import { UserService, ThreadService, MessageService, Thread, Message, User } from '../shared';
import { SocketService } from '../shared/socket.service';

@Component({
  selector: 'chat-container',
  directives: [ChatThreadsComponent,
               ChatWindowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app/chat-container/chat-container.component.html',
  styleUrls: ['app/chat-container/chat-container.component.css']
})
export class ChatContainerComponent implements OnInit {

    constructor(
        private messageService: MessageService,
        private userService: UserService,
        private threadsService: ThreadService,
        private jwtHelper: JwtHelper,
        private socketService: SocketService
        )
        {
        }

    ngOnInit(): void {
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
                            name: decode_toke.name
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
            data.Items.map((user:any) => {
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

                // Get messages of logged in user with this user from server
                this.messageService.getMessages(thread_name)
                    .subscribe((data) => {
                        var messages_server:Message[] = data.Items.map((message: any) => {
                            return new Message(
                                {
                                    isRead: false, 
                                    sentAt:message.created_at,
                                    author: new User(message.author),
                                    text: message.text,
                                    thread: thread
                                });
                        });
                        
                        // For threads don't have any messages yet
                        // create an empty message ( for add thread )
                        if(messages_server.length == 0)
                        {
                            messages_server = [new Message({
                                    thread: thread
                                })];
                        }

                        // Add messages into message service
                        this.messageService.updates.next((messages: Message[]) => {
                                return messages.concat(messages_server);
                            });
                    });

                this.threadsService.setCurrentThread(thread);

            });
        });


        this.socketService.start();
    }

}
