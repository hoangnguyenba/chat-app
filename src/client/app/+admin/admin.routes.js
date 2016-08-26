"use strict";
var chat_component_1 = require('./+chat/chat.component');
var auth_guard_1 = require('../auth.guard');
var admin_component_1 = require('./admin.component');
var history_routes_1 = require('./+history/history.routes');
var trigger_routes_1 = require('./+trigger/trigger.routes');
var dashboard_routes_1 = require('./+dashboard/dashboard.routes');
var profile_routes_1 = require('./+profile/profile.routes');
exports.AdminRoutes = [
    {
        path: '',
        component: admin_component_1.AdminComponent,
        canActivate: [auth_guard_1.AuthGuard],
        children: dashboard_routes_1.DashboardRoutes.concat(trigger_routes_1.TriggerRoutes, history_routes_1.HistoryRoutes, profile_routes_1.ProfileRoutes, [
            {
                path: 'chat/:id',
                component: chat_component_1.ChatComponent
            }
        ])
    }
];
//# sourceMappingURL=admin.routes.js.map