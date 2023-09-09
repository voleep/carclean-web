import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () =>
      import('@carclean/modules/app/app.module').then((m) => m.AppModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@carclean/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
