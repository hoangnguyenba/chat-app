import { Injectable } from '@angular/core';

import { Message, Thread, User } from './index';
// import { User } from './user.model';

@Injectable()
export class ChatUtilService {

    constructor() { }

    convertMessageFromServer(message:any, thread: Thread) : Message {
        return new Message(
                            {
                                isRead: false, 
                                sentAt:message.created_at,
                                author: new User(message.author),
                                text: message.text,
                                thread: thread
                            });
    }

}