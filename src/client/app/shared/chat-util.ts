import { Injectable } from '@angular/core';

import { Message, Thread, User } from './index';

@Injectable()
export class ChatUtilService {

    public mainHeight: number;
    public isSelectedChat: boolean = false;

    convertMessageFromServer(message:any, thread: Thread, user: User) : Message {
        let userid: string;
        if(thread.type === Thread.THREAD_TYPE_SERVE) {
            userid = 'admin';
        } else {
            userid = user.id;
        }

        return new Message(
                            {
                                isRead: _.include(message.is_read, userid),
                                sentAt:message.created_at,
                                author: new User(message.author),
                                text: message.text,
                                thread: thread,
                                type: message.type
                            });
    }

    isEmpty(text: string): boolean {
        let temp = text;
        temp = temp.replace(/(\r\n|\n|\r)/gm,'');
        temp = temp.trim();
        if (temp.length === 0 ) {
            return true;
        } else {
            return false;
        }
    }
}
