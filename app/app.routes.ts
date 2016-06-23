import { provideRouter, RouterConfig } from '@angular/router';

import { ChatContainerComponent } from './chat-container/chat-container.component';
import { LoginComponent } from './login/login.component';

export const routes: RouterConfig = [
  { path: '', component: ChatContainerComponent},
  { path: 'login', component: LoginComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
