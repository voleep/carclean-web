import { Location, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { OAuthService } from '@carclean/core/oauth/oauth.service';
import { MessengerService } from '@carclean/shared/services/messenger/messenger.service';
import { firstValueFrom } from 'rxjs';
import { LoginRoutesEnum } from '../../enums/login-routes.enum';
import { LoginService } from '../../login.service';

@Component({
  standalone: true,
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.scss'],
  imports: [
    NgIf,
    NgStyle,
    MatIcon,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    MatProgressSpinner,
  ],
})
export default class ResetPasswordComponent implements OnInit {
  isLoading = signal(false);

  passwordForm = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    confirmPassword: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  private email = signal('');

  private recoveryCode = signal(0);

  private destroyRef = inject(DestroyRef);

  constructor(
    private messenger: MessengerService,
    private loginService: LoginService,
    private oAuthService: OAuthService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;
    if (state.email) {
      this.email.set(state.email);
    } else {
      this.router.navigateByUrl(LoginRoutesEnum.entrar);
    }

    if (state.code) {
      this.recoveryCode.set(state.code);
    } else {
      this.router.navigateByUrl(LoginRoutesEnum.entrar);
    }

    const validator = this.createCompareValidator(
      this.passwordForm.controls.password,
      this.passwordForm.controls.confirmPassword
    );
    this.passwordForm.controls.confirmPassword.addValidators(validator);
  }

  @HostListener('document:keydown.enter')
  async handleResetPassword(): Promise<void> {
    this.passwordForm.markAllAsTouched();
    this.passwordForm.updateValueAndValidity();

    if (!this.passwordForm.valid) {
      return;
    }
    this.isLoading.set(true);

    try {
      const response = await firstValueFrom(
        this.loginService
          .resetNewPassword({
            email: this.email(),
            newPassword: this.passwordForm.controls.password.value,
            passwordRecoveryCode: this.recoveryCode(),
          })
          .pipe(takeUntilDestroyed(this.destroyRef))
      );

      if (!response.data) {
        throw Error('Opss. Algo saiu mal');
      }

      this.oAuthService.setOAuthData(response.data);
      this.router.navigateByUrl(LoginRoutesEnum.allDone);
    } catch (error) {
      this.messenger.showMessage(error);
    }

    this.isLoading.set(false);
  }

  private createCompareValidator(
    controlOne: AbstractControl,
    controlTwo: AbstractControl
  ) {
    return () => {
      if (controlOne.value !== controlTwo.value) return { notMatch: true };
      return null;
    };
  }
}
