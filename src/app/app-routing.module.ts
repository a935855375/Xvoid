import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginActivate} from './service/login-activate';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/pages/welcome'},
  {path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [LoginActivate]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
