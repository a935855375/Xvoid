import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
})
export class AuthModule {

}
