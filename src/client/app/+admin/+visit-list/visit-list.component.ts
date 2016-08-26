import { Component } from '@angular/core';
import { ContentHeaderService } from '../shared/index';

import { FORM_DIRECTIVES } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';

import { Router } from '@angular/router';

import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NG_TABLE_DIRECTIVES } from '../../shared/ng2-table/index';

import { TextService } from '../../shared/index';
import { Thread, ChatUtilService, UserService, ThreadService, MessageService, Message } from '../../shared/index';

import { VisitTableComponent } from './visit-table.component';

@Component({
    moduleId: module.id,
    selector: 'visit-list',
    templateUrl: 'visit-list.component.html',
    directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, VisitTableComponent]
})
export class VisitListComponent {

  private dataIdle:Array<any>;
  private dataIncoming:Array<any>;
  private dataServed:Array<any>;
  private unreadMessagesCount:any = [];

  constructor(
        private threadService: ThreadService,
        private contentHeaderService: ContentHeaderService,
        private textService: TextService,
        private userService: UserService,
        private threadsService: ThreadService,
        private messageService: MessageService,
        private chatUtilService: ChatUtilService,
        private router: Router
    ) {
      this.contentHeaderService.title = this.textService.get('visit_list');

      this.messageService.messages.subscribe(messages => {
            var r: any = [];
            messages.forEach((m: Message) => {
                  if(r[m.thread.id] === undefined)
                    r[m.thread.id] = 0;
                  if (m && !m.isRead && m.type === Message.MESSAGE_TYPE_TEXT) {
                      r[m.thread.id]++;
                  }
            });
            this.unreadMessagesCount = r;
        });

      this.threadService.orderedThreads.map(threads => {
        return _.filter(threads, thread => (thread.type === Thread.THREAD_TYPE_SERVE));
      }).subscribe(threads => {

        this.dataIdle = [];
        this.dataIncoming = [];
        this.dataServed = [];
        threads.forEach(t => {
          if(this.unreadMessagesCount[t.id] === undefined)
            this.unreadMessagesCount[t.id] = 0;
          var data = {
            id: t.id,
            name: t.name,
            status: t.status,
            serve_status: t.serve_status,
            last_message_time: t.lastMessage.sentAt,
            last_message: t.lastMessage.text === null ? '' : t.lastMessage.text,
            unread_message: this.unreadMessagesCount[t.id]
          };
          if(t.serve_status === Thread.THREAD_SERVE_STATUS_IDLE) {
            this.dataIdle.push(data);
          } else if(t.serve_status === Thread.THREAD_SERVE_STATUS_INCOMING_CHAT) {
            this.dataIncoming.push(data);
          } else if(t.serve_status === Thread.THREAD_SERVE_STATUS_SERVED) {
            this.dataServed.push(data);
          }
        });
      });
    }
}
