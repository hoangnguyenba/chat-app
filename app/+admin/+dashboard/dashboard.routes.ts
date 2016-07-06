import { RouterConfig } from '@angular/router';
import { DashboardComponent } from './index';
import { AuthGuard } from '../../auth.guard';

export const DashboardRoutes: RouterConfig = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];
