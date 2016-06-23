import { provideRouter, RouterConfig } from '@angular/router';

import { ChatContainerComponent } from './chat-container/chat-container.component';
import { LoginRoutes, AUTH_PROVIDERS } from './login/login.routes';
import { AuthGuard } from './auth.guard';

export const routes: RouterConfig = [
    { 
        path: '', 
        component: ChatContainerComponent,
        canActivate: [AuthGuard]
    },
  ...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];
