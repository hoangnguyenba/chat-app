import { Injectable } from '@angular/core';

import { Message, Thread, User } from './index';
// import { User } from './user.model';

@Injectable()
export class ChatUtilService {

    constructor() { }

    convertMessageFromServer(message:any, thread: Thread, user: User) : Message {
        return new Message(
                            {
                                isRead: _.include(message.is_read, user.id), 
                                sentAt:message.created_at,
                                author: new User(message.author),
                                text: message.text,
                                thread: thread
                            });
    }

}