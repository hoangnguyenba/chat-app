import { RouterConfig } from '@angular/router';

import { ChatComponent } from './+chat/chat.component';
import { AuthGuard } from '../auth.guard';
import { HistoryRoutes } from './+history/history.routes';
import { TriggerRoutes } from './+trigger/trigger.routes';
import { ChatRoutes } from './+chat/chat.routes';

export const BillFoldRoutes: RouterConfig = [
  ...ChatRoutes,
  ...HistoryRoutes,
  ...TriggerRoutes
];
