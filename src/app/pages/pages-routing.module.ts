import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        loadChildren: () => import('./welcome/welcome.module')
          .then(m => m.WelcomeModule)
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module')
          .then(m => m.MonitorModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {

}
