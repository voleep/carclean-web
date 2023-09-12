import {
  Component,
  ElementRef,
  OnInit,
  Query,
  QueryList,
  ViewChildren,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginRoutesEnum } from '../../enums/login-routes.enum';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { pairwise } from 'rxjs';

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

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    const state = this.location.getState();
    if (
      typeof state === 'object' &&
      state !== null &&
      'email' in state &&
      typeof state.email === 'string'
    ) {
      this.email.set(state.email);
    } else {
      this.router.navigateByUrl(LoginRoutesEnum.entrar);
    }

    this.codeFormArray.controls.forEach((control, index) => {
      control.valueChanges
        .pipe(pairwise())
        .subscribe(([previous, current]: [number | null, number | null]) => {
          console.log(previous, current);
          const first = index == 0;
          const last = index == this.codeFormArray.controls.length - 1;
          if (!first && previous == null && current == null) {
            this.formFieldList?.get(index - 1)?.nativeElement.focus();
            return;
          }

          if (current && String(current).length > 1) {
            this.codeFormArray.patchValue(
              Array.from(String(current), (num) => Number(num))
            );
            return;
          }

          if (!last && current != null) {
            this.formFieldList?.get(index + 1)?.nativeElement.focus();
            return;
          }
        });
    });
  }
}
