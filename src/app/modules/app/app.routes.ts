import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component'),
    children: [
      {
        path: 'cadastro',
        loadChildren: () =>
          import('@carclean/modules/register/register.routes'),
      },
    ],
  },
];

export default routes;
