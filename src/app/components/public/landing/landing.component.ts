import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../auth/login-dialog/login-dialog.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {}

  public async onLogin() {
    try {
      const authDialogResponse = await this.onOpenLoginForm();

      if (authDialogResponse) {
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private onOpenLoginForm(): Promise<boolean> {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        data: {},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      });
    })
  }
}
