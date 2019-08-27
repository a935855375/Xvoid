import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/zh';
import {ValidService} from './service/valid-service';
import {AuthService} from './service/auth-service';
import {AuthInterceptor} from './service/auth-interceptor';
import {LoginActivate} from './service/login-activate';
import {ApiService} from './service/api-service';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from 'ngx-markdown';

registerLocaleData(en);

export function markedOptions(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptions,
      },
    }),
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_BASE_HREF, useValue: '/'},
    ValidService,
    AuthService,
    LoginActivate,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
