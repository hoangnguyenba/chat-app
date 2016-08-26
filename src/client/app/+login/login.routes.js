"use strict";
var auth_guard_1 = require('../auth.guard');
var auth_service_1 = require('../shared/auth.service');
var login_component_1 = require('./login.component');
exports.LoginRoutes = [
    { path: 'login', component: login_component_1.LoginComponent }
];
exports.AUTH_PROVIDERS = [auth_guard_1.AuthGuard, auth_service_1.AuthService];
//# sourceMappingURL=login.routes.js.map