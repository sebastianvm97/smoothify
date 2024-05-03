import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [],
  providers: [
    AuthService
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
  ) {}

  public async onSignIn() {
    try {
      const email = 'test-01@test.com';
      const pass = '123456';

      await this.authService.signInUser(email, pass);

      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
      this.dialogRef.close(false);
    }
  }

  public async onSignOut() {
    try {
      await this.authService.signUserOut();
      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
      this.dialogRef.close(false);
    }
  }
}
