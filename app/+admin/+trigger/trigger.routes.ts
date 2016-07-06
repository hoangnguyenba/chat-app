import { RouterConfig } from '@angular/router';
import { TriggerComponent } from './index';
import { AuthGuard } from '../../auth.guard';

export const TriggerRoutes: RouterConfig = [
  {
    path: 'trigger',
    component: TriggerComponent
  },
];
