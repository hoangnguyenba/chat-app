import { RouterConfig } from '@angular/router';

import { ChatComponent } from './chat.component';

import { AuthGuard } from '../../auth.guard';

export const ChatRoutes: RouterConfig = [
  {
    path: 'chat/:id',
    component: ChatComponent
  },
];
