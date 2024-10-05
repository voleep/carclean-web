import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import('./customer/customer.routes'),
  },
];

export default routes;
