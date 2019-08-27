import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitorComponent} from './monitor.component';
import {MonitorRoutingModule} from './monitor-routing.module';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
  declarations: [
    MonitorComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    MarkdownModule.forChild(),
  ]
})
export class MonitorModule {

}
