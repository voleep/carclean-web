import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { LoginService } from '../../login.service';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { MessengerService } from '@carclean/shared/services/messenger/messenger.service';
import { Router } from '@angular/router';
import { LoginRoutesEnum } from '../../enums/login-routes.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'ap-forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  focusEmail = signal(false);

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
    setTimeout(() => this.focusEmail.set(true), 300);
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
