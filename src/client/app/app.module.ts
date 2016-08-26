import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { APP_CONFIG, CHAT_APP_CONFIG } from './config';

@NgModule({
  imports: [BrowserModule, HttpModule, routing, SharedModule.forRoot(), ReactiveFormsModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
  appRoutingProviders,
  { provide: APP_CONFIG, useValue: CHAT_APP_CONFIG },
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }

