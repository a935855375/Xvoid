import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {MessageComponent} from './message/message.component';
import {CommonModule} from '@angular/common';
import {WebsocketService} from './websocket-service';


@NgModule({
  imports: [
    WelcomeRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    WelcomeComponent,
    MessageComponent
  ],
  exports: [WelcomeComponent],
  providers: [
    WebsocketService
  ]
})
export class WelcomeModule {
}
