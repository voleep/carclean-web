import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginFormComponent } from './components/login-form/login-form-component';
import { VerifyRecoveryCodeComponent } from './components/verify-recovery-code/verify-recovery-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AllDoneComponent } from './components/all-done/all-done.component';

const routes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: LoginFormComponent,
        data: { animation: 'LoginForm' },
      },
      {
        path: 'recuperar-senha',
        component: ForgotPasswordComponent,
        data: { animation: 'ForgotPassword' },
      },
      {
        path: 'recuperar-senha/verificar',
        component: VerifyRecoveryCodeComponent,
        data: { animation: 'RecoveryCode' },
      },
      {
        path: 'recuperar-senha/resetar',
        component: ResetPasswordComponent,
        data: { animation: 'ResetPassword' },
      },
      {
        path: 'recuperar-senha/concluida',
        component: AllDoneComponent,
        data: { animation: 'AllDone' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
