"use strict";
var router_1 = require('@angular/router');
var admin_routes_1 = require('./+admin/admin.routes');
var login_routes_1 = require('./+login/login.routes');
exports.routes = admin_routes_1.AdminRoutes.concat(login_routes_1.LoginRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes),
    login_routes_1.AUTH_PROVIDERS
];
//# sourceMappingURL=app.routes.js.map