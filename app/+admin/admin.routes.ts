import { RouterConfig } from '@angular/router';

import { ChatComponent } from './+chat/chat.component';
import { AuthGuard } from '../auth.guard';
import { AdminComponent } from './admin.component';
import { HistoryRoutes } from './+history/history.routes';
import { HistoryComponent } from './+history/history.component';
import { TriggerRoutes } from './+trigger/trigger.routes';
import { DashboardComponent } from './+dashboard/dashboard.component';
import { TriggerComponent } from './+trigger/trigger.component';
import { ChatRoutes } from './+chat/chat.routes';
import { DashboardRoutes } from './+dashboard/dashboard.routes';


export const AdminRoutes: RouterConfig = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      ...DashboardRoutes,
      ...TriggerRoutes,
      ...HistoryRoutes,
      {
        path: 'chat/:id',
        component: ChatComponent
      }
    ]
  }
];