import { provideRouter, RouterConfig } from '@angular/router';

import { BillFoldRoutes } from './+bill-fold/bill-fold.routes';
import { LoginRoutes, AUTH_PROVIDERS } from './+login/login.routes';
import { AuthGuard } from './auth.guard';

export const routes: RouterConfig = [
  ...BillFoldRoutes,
  ...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];
