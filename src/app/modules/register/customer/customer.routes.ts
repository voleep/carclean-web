import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/customer-list/customer-list.component'),
  },
];

export default routes;
