import { RouterConfig } from '@angular/router';

import { ChatComponent } from './chat.component';

export const ChatRoutes: RouterConfig = [
  {
    path: 'chat/:id',
    component: ChatComponent
  },
];
