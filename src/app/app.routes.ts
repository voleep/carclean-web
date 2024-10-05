import { Routes } from '@angular/router';
import { canActivateApp } from './core/oauth/app.guard';
import { canActivateLogin } from './core/oauth/login.guard';

const appRoutes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('@carclean/modules/app/app.routes'),
    canActivate: [canActivateApp],
    canActivateChild: [canActivateApp],
  },
  {
    path: 'entrar',
    loadChildren: () => import('@carclean/modules/login/login.routes'),
    canActivate: [canActivateLogin],
  },
  {
    path: '',
    redirectTo: '/entrar',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/entrar' },
];

export default appRoutes;
