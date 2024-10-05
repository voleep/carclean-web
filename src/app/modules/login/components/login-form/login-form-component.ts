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
import { OAuthModel } from '@carclean/core/oauth/models/oauth.model';
import { OAuthService } from '@carclean/core/oauth/oauth.service';
import { MessengerService } from '@carclean/shared/services/messenger/messenger.service';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '../../login.service';
import { LoginRequest } from '../../models/login-request';

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
      const data: LoginRequest = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value,
      };

      const request = this.loginService.signIn(data);
      const response = await firstValueFrom(
        request.pipe(takeUntilDestroyed(this.destroyRef))
      );

      const model: OAuthModel = {
        userId: response.data!.user.id,
        companyId: response.data!.company?.id,
        token: response.data!.token,
        refreshToken: response.data!.refreshToken,
      };

      this.oAuthService.setOAuthData(model);
      this.router.navigateByUrl('/app');
    } catch (error) {
      this.messenger.showMessage(error);
    }
    this.isLoading.set(false);
  }
}
