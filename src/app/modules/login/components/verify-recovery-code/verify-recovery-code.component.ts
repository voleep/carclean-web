import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginRoutesEnum } from '../../enums/login-routes.enum';
import { Location } from '@angular/common';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { MessengerService } from '@carclean/shared/services/messenger/messenger.service';
import { LoginService } from '../../login.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-verify-recovery-code',
  templateUrl: 'verify-recovery-code.component.html',
  styleUrls: ['verify-recovery-code.component.scss'],
})
export class VerifyRecoveryCodeComponent implements OnInit {
  isLoading = signal(false);

  email = signal('');

  codeFormArray = new FormArray([
    new FormControl<number | null>(null, Validators.required),
    new FormControl<number | null>(null, Validators.required),
    new FormControl<number | null>(null, Validators.required),
    new FormControl<number | null>(null, Validators.required),
    new FormControl<number | null>(null, Validators.required),
    new FormControl<number | null>(null, Validators.required),
  ]);

  @ViewChildren(MatInput, { read: ElementRef })
  private formFieldList?: QueryList<ElementRef<HTMLInputElement>>;

  private destroyRef = inject(DestroyRef);

  constructor(
    private location: Location,
    private router: Router,
    private messenger: MessengerService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;
    if (state.email) {
      this.email.set(state.email);
    } else {
      this.router.navigateByUrl(LoginRoutesEnum.entrar);
    }
  }

  @HostListener('document:keydown.enter')
  async handleVerifyCode(): Promise<void> {
    this.codeFormArray.controls.forEach((control) =>
      control.updateValueAndValidity()
    );
    this.codeFormArray.markAllAsTouched();
    if (!this.codeFormArray.valid) {
      return;
    }
    this.isLoading.set(true);
    try {
      const recoveryCode = Number(
        this.codeFormArray.controls.map((control) => control.value).join('')
      );
      const response = await firstValueFrom(
        this.loginService
          .verifyRecoveryCode({
            email: this.email(),
            code: recoveryCode,
          })
          .pipe(takeUntilDestroyed(this.destroyRef))
      );
      if (response.data == true) {
        this.router.navigateByUrl(LoginRoutesEnum.resetarSenha, {
          state: { email: this.email(), code: recoveryCode },
        });
        return;
      }

      this.codeFormArray.controls.forEach((control) =>
        control.setErrors({ required: true })
      );
      this.codeFormArray.updateValueAndValidity();
      this.messenger.showMessage('Código inválido.');
    } catch (error) {
      this.messenger.showMessage(error);
    }
    this.isLoading.set(false);
  }

  handleKeyDown(
    event: KeyboardEvent,
    index: number,
    first: boolean,
    last: boolean
  ) {
    const input = event.target as HTMLInputElement;
    const isBackspace = event.key == 'Backspace';
    if (isBackspace && !first && !input.value.length) {
      event.preventDefault();
      this.formFieldList?.get(index - 1)?.nativeElement.focus();
      return;
    }

    const isArrowRight = event.key == 'ArrowRight';
    if (isArrowRight && !last) {
      event.preventDefault();
      this.formFieldList?.get(index + 1)?.nativeElement.focus();
      return;
    }

    const isArrowLeft = event.key == 'ArrowLeft';
    if (isArrowLeft && !first) {
      event.preventDefault();
      this.formFieldList?.get(index - 1)?.nativeElement.focus();
    }
  }

  handleInputChange(event: Event, index: number, last: boolean) {
    const input = event.target as HTMLInputElement;
    if (!input.value.length) return;

    if (input.value.length == 6) {
      this.codeFormArray.patchValue(
        Array.from(input.value, (num) => Number(num))
      );
      this.formFieldList?.last?.nativeElement.focus();
      return;
    }

    if (input.value.length > 1) {
      this.codeFormArray.at(index)?.setValue(Number(input.value.at(0)));
    }

    if (last) return;

    this.formFieldList?.get(index + 1)?.nativeElement.focus();
  }
}
