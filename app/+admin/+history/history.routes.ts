import { RouterConfig } from '@angular/router';
import { HistoryComponent } from './index';
import { AuthGuard } from '../../auth.guard';

export const HistoryRoutes: RouterConfig = [
  {
    path: 'history',
    component: HistoryComponent
  },
];
