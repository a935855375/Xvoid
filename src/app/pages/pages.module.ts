import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {PagesRoutingModule} from './pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    PagesRoutingModule,
  ],
  providers: [

  ]
})
export class PagesModule {

}
