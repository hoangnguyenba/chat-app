import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

@Component({
  selector: 'chat-container',
  directives: [ChatThreadsComponent,
               ChatWindowComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'app/chat-container/chat-container.component.html',
  styleUrls: ['app/chat-container/chat-container.component.css']
})
export class ChatContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
