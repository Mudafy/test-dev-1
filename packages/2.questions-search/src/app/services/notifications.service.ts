import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public snackBar: MatSnackBar) { }

  panelClassKey = 'panelClass';

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };

  success(msg: string) {
    this.config[this.panelClassKey] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  warn(msg: string) {
    this.config[this.panelClassKey] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
