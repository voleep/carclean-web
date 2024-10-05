import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/login.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/login-form/login-form-component'),
        data: { animation: 'LoginForm' },
      },
      {
        path: 'recuperar-senha',
        loadComponent: () =>
          import('./components/forgot-password/forgot-password.component'),
        data: { animation: 'ForgotPassword' },
      },
      {
        path: 'recuperar-senha/verificar',
        loadComponent: () =>
          import(
            './components/verify-recovery-code/verify-recovery-code.component'
          ),
        data: { animation: 'RecoveryCode' },
      },
      {
        path: 'recuperar-senha/resetar',
        loadComponent: () =>
          import('./components/reset-password/reset-password.component'),
        data: { animation: 'ResetPassword' },
      },
      {
        path: 'recuperar-senha/concluida',
        loadComponent: () => import('./components/all-done/all-done.component'),
        data: { animation: 'AllDone' },
      },
    ],
  },
];

export default routes;
