"use strict";
var index_1 = require('./index');
exports.DashboardRoutes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: index_1.DashboardComponent
    }
];
//# sourceMappingURL=dashboard.routes.js.map