import { RouterConfig } from '@angular/router';
import { DashboardComponent } from './index';

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
