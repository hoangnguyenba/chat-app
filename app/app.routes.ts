import { provideRouter, RouterConfig } from '@angular/router';

import { AdminRoutes } from './+admin/admin.routes';
import { LoginRoutes, AUTH_PROVIDERS } from './+login/login.routes';
import { AuthGuard } from './auth.guard';

export const routes: RouterConfig = [
  ...AdminRoutes,
  ...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];
