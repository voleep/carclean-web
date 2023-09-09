import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuardService } from './core/oauth/app-guard.service';
import { LoginGuardService } from './core/oauth/login-guard.service';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () =>
      import('@carclean/modules/app/app.module').then((m) => m.AppModule),
    canActivate: [AppGuardService],
    canActivateChild: [AppGuardService],
  },
  {
    path: 'entrar',
    loadChildren: () =>
      import('@carclean/modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuardService],
  },
  {
    path: '',
    redirectTo: '/entrar',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/entrar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AppGuardService, LoginGuardService],
})
export class AppRoutingModule {}
