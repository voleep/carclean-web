import { NgIf, NgStyle } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { OAuthService } from '@carclean/core/oauth/oauth.service';
import { MessengerService } from '@carclean/shared/services/messenger/messenger.service';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '../../login.service';

@Component({
  standalone: true,
  selector: 'app-login-form',
  templateUrl: 'login-form-component.html',
  styleUrls: ['login-form-component.scss'],
  imports: [
    NgIf,
    NgStyle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatButton,
    MatProgressSpinner,
  ],
  providers: [LoginService],
})
export default class LoginFormComponent {
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
