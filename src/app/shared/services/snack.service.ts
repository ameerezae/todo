import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable(
  {providedIn: 'root'}
)
export class SnackService {
  autoHide: number = 40000;
  config: MatSnackBarConfig = {
    duration: 4000,
    verticalPosition: "bottom",
    horizontalPosition: "end",
  }
  constructor(private snack: MatSnackBar) {
  }

  successMessage(message: string) {
    this.config.panelClass = ['success-snackbar'];
    this.snack.open(message, null, this.config);
  }

  errorMessage(message: string) {
    this.config.panelClass = ['error-snackbar'];
    this.snack.open(message, null, this.config);
  }
}
