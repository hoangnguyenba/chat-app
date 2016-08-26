"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/switchMap');
require('rxjs/add/operator/do');
var _chat_threads_1 = require('./+chat/+chat-threads');
var angular2_jwt_1 = require('angular2-jwt');
var ng2_toastr_1 = require('ng2-toastr');
var tabs_1 = require('ng2-bootstrap/components/tabs');
var dropdown_1 = require('ng2-bootstrap/components/dropdown');
var typeahead_1 = require('ng2-bootstrap/components/typeahead');
var modal_1 = require('ng2-bootstrap/components/modal');
var components_helper_service_1 = require('ng2-bootstrap/components/utils/components-helper.service');
var index_1 = require('./shared/index');
var shared_1 = require('../shared');
var AdminComponent = (function () {
    function AdminComponent(router, jwtHelper, messageService, userService, threadsService, socketService, chatUtilService, optionService, textService, toastsService, contentHeaderService, authService, elRef) {
        this.router = router;
        this.jwtHelper = jwtHelper;
        this.messageService = messageService;
        this.userService = userService;
        this.threadsService = threadsService;
        this.socketService = socketService;
        this.chatUtilService = chatUtilService;
        this.optionService = optionService;
        this.textService = textService;
        this.toastsService = toastsService;
        this.contentHeaderService = contentHeaderService;
        this.authService = authService;
        this.elRef = elRef;
        this.heightMain = 0;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fixWindow();
        this.messageService.messages.subscribe(function () { return ({}); });
        // if current use doesn't exist (because remmber jwt)
        this.userService.currentUser.subscribe(function (user) {
            // try to load current
            if (user == null) {
                var id_token = localStorage.getItem('id_token');
                var decode_toke = _this.jwtHelper.decodeToken(id_token);
                _this.currentUser = new shared_1.User({
                    id: decode_toke.id,
                    name: decode_toke.name,
                    logo: decode_toke.logo,
                    status: shared_1.User.USER_STATUS_ONLINE
                });
                _this.userService.setCurrentUser(_this.currentUser);
            }
            else {
                _this.currentUser = user;
            }
        });
        // create the initial messages
        // Get list user from server
        this.userService.getManagerList().subscribe(function (data) {
            data.Items.forEach(function (user) {
                var thread_name;
                if (user.id < _this.currentUser.id)
                    thread_name = user.id + ':' + _this.currentUser.id;
                else
                    thread_name = _this.currentUser.id + ':' + user.id;
                // With every user, create a new thread
                var thread = new shared_1.Thread({
                    id: thread_name,
                    name: user.name
                });
                if (user.hasOwnProperty('status')) {
                    thread.status = user.status;
                }
                else {
                    thread.status = shared_1.User.USER_STATUS_OFFLINE;
                }
                // create an empty message ( for add thread )
                var messages_server = [new shared_1.Message({
                        isRead: true,
                        thread: thread
                    })];
                // Add messages into message service
                _this.messageService.updates.next(function (messages) {
                    return messages.concat(messages_server);
                });
            });
        });
        // Get list thread from server
        this.threadsService.getThreadList().subscribe(function (data) {
            if (_.isEmpty(data))
                return;
            data.forEach(function (threadServer) {
                var thread_name = threadServer.thread_id;
                // var thread: Thread = new Thread(threadServer);
                var thread = new shared_1.Thread({
                    id: thread_name,
                    name: threadServer.name,
                    status: shared_1.User.USER_STATUS_ONLINE
                });
                var messages_server = [new shared_1.Message({
                        isRead: true,
                        thread: thread
                    })];
                // Add messages into message service
                _this.messageService.updates.next(function (messages) {
                    return messages.concat(messages_server);
                });
            });
        });
        this.toastsService.success('Welcome back ' + this.currentUser.name);
        this.socketService.start();
    };
    AdminComponent.prototype.onResize = function () {
        this.fixWindow();
    };
    AdminComponent.prototype.fixWindow = function () {
        var elHeader = this.elRef.nativeElement.children[0];
        var elFooter = this.elRef.nativeElement.children[3];
        var elSidebar = this.elRef.nativeElement.children[1];
        var elMain = this.elRef.nativeElement.children[2];
        var elSidebarMenu = elSidebar.children[0];
        var heightWindowInder = window.innerHeight;
        this.heightMain = elMain.offsetHeight;
        if (heightWindowInder >= (elHeader.offsetHeight + elFooter.offsetHeight + elSidebarMenu.offsetHeight)) {
            var minHeight = heightWindowInder - (elHeader.offsetHeight + elFooter.offsetHeight + 30);
            elMain.style.minHeight = minHeight + 'px';
            elMain.children[1].style.minHeight = (minHeight - elMain.children[0].offsetHeight) + 'px';
            this.heightMain = minHeight - elMain.children[0].offsetHeight;
            this.chatUtilService.mainHeight = this.heightMain;
        }
    };
    AdminComponent.prototype.logout = function () {
        this.authService.logout();
    };
    AdminComponent.prototype.status = function () {
        return {
            'text-green': this.currentUser.status == shared_1.User.USER_STATUS_ONLINE,
            'text-yellow': this.currentUser.status == shared_1.User.USER_STATUS_AWAY,
            'text-red': this.currentUser.status == shared_1.User.USER_STATUS_BUSY
        };
    };
    AdminComponent.prototype.statusText = function () {
        if (this.currentUser.status == shared_1.User.USER_STATUS_ONLINE)
            return "Online";
        if (this.currentUser.status == shared_1.User.USER_STATUS_OFFLINE)
            return "Offline";
        if (this.currentUser.status == shared_1.User.USER_STATUS_AWAY)
            return "Away";
        if (this.currentUser.status == shared_1.User.USER_STATUS_BUSY)
            return "Busy";
    };
    AdminComponent.prototype.changeStatus = function (status) {
        this.currentUser.status = status;
        // Broadcast to server
        this.socketService.broadcastStatus(this.currentUser.status);
    };
    AdminComponent.prototype.searchUserOnSelect = function (user) {
        var thread_id = "";
        if (this.currentUser.id < user.item.id)
            thread_id = this.currentUser.id + "-" + user.item.id;
        else
            thread_id = user.item.id + "-" + this.currentUser.id;
        this.router.navigate(['/chat/' + thread_id]);
    };
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin',
            templateUrl: 'admin.component.html',
            styleUrls: ['admin.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES,
                _chat_threads_1.ChatThreadsComponent,
                dropdown_1.DROPDOWN_DIRECTIVES,
                modal_1.MODAL_DIRECTIVES,
                tabs_1.TAB_DIRECTIVES,
                typeahead_1.TYPEAHEAD_DIRECTIVES,
                forms_1.FORM_DIRECTIVES,
                forms_1.REACTIVE_FORM_DIRECTIVES,
                common_1.CORE_DIRECTIVES],
            viewProviders: [{ provide: components_helper_service_1.ComponentsHelper, useClass: components_helper_service_1.ComponentsHelper }],
            providers: [index_1.ContentHeaderService],
            host: {
                '(window:resize)': 'onResize()'
            }
        }), 
        __metadata('design:paramtypes', [router_1.Router, angular2_jwt_1.JwtHelper, shared_1.MessageService, shared_1.UserService, shared_1.ThreadService, shared_1.SocketService, shared_1.ChatUtilService, shared_1.OptionService, shared_1.TextService, ng2_toastr_1.ToastsManager, index_1.ContentHeaderService, shared_1.AuthService, core_1.ElementRef])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map