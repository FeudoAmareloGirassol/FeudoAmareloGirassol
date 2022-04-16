import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar) { }

  showError(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ["error-snackbar"]
    });
  }

  showSuccess(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }

  showWarning(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['warning-snackbar']
    });
  }
}
