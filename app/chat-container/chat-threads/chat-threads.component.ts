import {
  Component,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { ThreadService } from '../../shared';

import { ChatThreadComponent } from './chat-thread.component';

@Component({
  selector: 'chat-threads',
  directives: [ChatThreadComponent],
  templateUrl: 'app/chat-container/chat-threads/chat-threads.component.html'
})
export class ChatThreadsComponent implements OnInit {

  threads: Observable<any>;

  constructor(public threadService: ThreadService) {
    this.threads = threadService.orderedThreads;
  }

  ngOnInit(): void {
  }

}