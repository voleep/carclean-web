import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessengerService {
  constructor(private snackbar: MatSnackBar) {}

  showMessage(message: string | any): void {
    if (typeof message === 'string') {
      this.snackbar.open(message, 'OK', {
        duration: 3000,
      });
      return;
    }

    this.snackbar.open(message.error.errorMessage ?? message, 'OK', {
      duration: 3000,
    });
  }
}
