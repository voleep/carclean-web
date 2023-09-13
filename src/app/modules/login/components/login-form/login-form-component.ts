import { Component, DestroyRef, inject, signal } from '@angular/core';
import { LoginService } from '../../login.service';
import { OAuthService } from '@carclean/core/oauth/oauth.service';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessengerService } from '@carclean/shared/services/messenger/messenger.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form-component.html',
  styleUrls: ['login-form-component.scss'],
})
export class LoginFormComponent {
  isLoading = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  private destroyRef = inject(DestroyRef);

  constructor(
    private loginService: LoginService,
    private oAuthService: OAuthService,
    private messenger: MessengerService,
    private router: Router
  ) {}

  private validate(): boolean {
    this.loginForm.updateValueAndValidity();
    return this.loginForm.valid;
  }

  async handleLoginClicked(): Promise<void> {
    if (!this.validate()) return;

    this.isLoading.set(true);
    try {
      const response = await firstValueFrom(
        this.loginService
          .signIn(
            this.loginForm.controls.email.value,
            this.loginForm.controls.password.value
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
      );

      if (!response.data) {
        throw Error('Ocorreu um erro desconhecido');
      }

      this.oAuthService.setOAuthData(response.data);
      this.router.navigateByUrl('/app');
    } catch (error) {
      this.messenger.showMessage(error);
    }
    this.isLoading.set(false);
  }
}
