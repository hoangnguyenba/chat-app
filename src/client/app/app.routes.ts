// import { provideRouter, RouterConfig } from '@angular/router';

import { AdminRoutes } from './+admin/admin.routes';
// import { LoginRoutes, AUTH_PROVIDERS } from './+login/login.routes';

// export const routes: RouterConfig = [
//   ...AdminRoutes,
//   ...LoginRoutes
// ];

// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes),
//   AUTH_PROVIDERS
// ];


/////
import { Routes, RouterModule }   from '@angular/router';

import { loginRoutes,
         authProviders }  from './+login/login.routes';

const appRoutes: Routes = [
  ...loginRoutes,
  ...AdminRoutes

  // { path: '', redirectTo: 'admin', pathMatch: 'full'},
  // { path: 'login', loadChildren: 'app/+login/login.module' },
  // { path: '', loadChildren: 'app/+admin/admin.module' }
];

export const appRoutingProviders: any[] = [
  authProviders
];

export const routing = RouterModule.forRoot(appRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/




