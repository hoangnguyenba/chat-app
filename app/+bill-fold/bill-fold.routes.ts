import { RouterConfig } from '@angular/router';

import { ChatComponent } from './+chat/chat.component';
import { AuthGuard } from '../auth.guard';
import { BillFoldComponent } from './bill-fold.component';
import { HistoryRoutes } from './+history/history.routes';
import { HistoryComponent } from './+history/history.component';
import { TriggerRoutes } from './+trigger/trigger.routes';
import { DashboardComponent } from './+dashboard/dashboard.component';
import { TriggerComponent } from './+trigger/trigger.component';
import { ChatRoutes } from './+chat/chat.routes';

// export const BillFoldRoutes: RouterConfig = [
//   ...ChatRoutes,
//   ...HistoryRoutes,
//   ...TriggerRoutes
// ];


export const BillFoldRoutes: RouterConfig = [
  {
    path: '',
    component: BillFoldComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChatComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'trigger',
        component: TriggerComponent
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      ...ChatRoutes
    ]
  }
];