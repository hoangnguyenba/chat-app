import { RouterConfig } from '@angular/router';

import { ChatRoutes } from './+chat/chat.routes';
import { AuthGuard } from '../auth.guard';
import { AdminComponent } from './admin.component';
import { HistoryRoutes } from './+history/history.routes';
import { VisitListRoutes } from './+visit-list/visit-list.routes';
import { TriggerRoutes } from './+trigger/trigger.routes';
import { DashboardRoutes } from './+dashboard/dashboard.routes';
import { ProfileRoutes } from './+profile/profile.routes';


export const AdminRoutes: RouterConfig = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      ...DashboardRoutes,
      ...TriggerRoutes,
      ...HistoryRoutes,
      ...VisitListRoutes,
      ...ProfileRoutes,
      ...ChatRoutes
    ]
  }
];
