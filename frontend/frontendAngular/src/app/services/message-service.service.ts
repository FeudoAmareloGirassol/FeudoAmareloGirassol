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
    });
  }

  showSuccess(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 2000,
    });
  }

  showWarning(message: string, action: string) {
    this._snackBar.open(message, action, {
       duration: 2000,
    });
  }
}
