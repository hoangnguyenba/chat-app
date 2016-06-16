import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

import { UserService, ThreadService, MessageService, Thread, Message, User } from '../shared';

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
      private threadsService: ThreadService
      )
    {
    }

    ngOnInit(): void {
        this.messageService.messages.subscribe(() => ({}));

        // set "Juliet" as the current user
        // this.userService.setCurrentUser(me);

        var threadMessi: Thread = new Thread(
            {
                id: 'user1:user2',
                name: "Messi"
            });

        // create the initial messages
        this.messageService.getMessages('user1:user2')
          .subscribe((data) => {
            var messages_server:Message[] = data.Items.map((item: any) => {
                return new Message(
                    {
                        isRead: false, 
                        sentAt:item.created_at,
                        author: new User(item.author),
                        text: item.text,
                        thread: threadMessi
                    });
            });
            
            this.messageService.updates.next((messages: Message[]) => {
                return messages.concat(messages_server);
            });
        });


        this.threadsService.setCurrentThread(threadMessi);
    }

}
