import { NgModule, ModuleWithProviders, provide } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AUTH_PROVIDERS, JwtHelper } from './angular2-jwt.service';
import { MessageService } from './message.service';
import { ThreadService } from './thread.service';
import { UserService } from './user.service';
import { ChatUtilService } from './chat-util';
import { PushNotificationService, NotificationConfig } from './push-notification.service';
import { PageVisibilityService } from './page-visibility.service';
import { OptionService } from './option.service';
import { TextService } from './text.service';
import { SocketService } from './socket.service';
import { ToastsManager, ToastOptions } from 'ng2-toastr';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
                            AUTH_PROVIDERS,
                            JwtHelper,
                            ChatUtilService,
                            MessageService,
                            UserService,
                            ThreadService,
                            SocketService,
                            provide(ToastOptions, {
                                useValue: new ToastOptions({
                                    positionClass: 'toast-bottom-right',
                                })
                            }),
                            ToastsManager,
                            PageVisibilityService,
                            OptionService,
                            TextService,
                            // PushNotificationService
                            provide(PushNotificationService, {
                                useFactory: () => {
                                    return new PushNotificationService(new NotificationConfig({
                                        title: 'Chat App'
                                    }));
                                }
                            }),]
    };
  }
}
