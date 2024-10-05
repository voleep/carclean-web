import { Location, NgIf, NgStyle } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { MessengerService } from '@carclean/shared/services/messenger/messenger.service';
import { firstValueFrom } from 'rxjs';
import { LoginRoutesEnum } from '../../enums/login-routes.enum';
import { LoginService } from '../../login.service';

@Component({
  standalone: true,
  selector: 'ap-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss'],
  imports: [
    NgStyle,
    NgIf,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatProgressSpinner,
    RouterLink,
  ],
  providers: [LoginService],
})
export default class ForgotPasswordComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  isLoading = signal(false);

  emailControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  });

  constructor(
    private loginService: LoginService,
    private messenger: MessengerService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;

    if (state.email) {
      this.emailControl.setValue(state.email);
    }
  }

  async handleRecoveryPassword(): Promise<void> {
    this.emailControl.updateValueAndValidity();
    if (!this.emailControl.valid) return;
    this.isLoading.set(true);
    try {
      await firstValueFrom(
        this.loginService
          .resetPassword(this.emailControl.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
      );
      this.router.navigateByUrl(LoginRoutesEnum.vefificarCodigo, {
        state: { email: this.emailControl.value },
      });
    } catch (error) {
      this.messenger.showMessage(error);
    }
    this.isLoading.set(false);
  }
}
