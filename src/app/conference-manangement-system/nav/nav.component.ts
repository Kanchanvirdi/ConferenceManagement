import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor( private router: Router,private dialog: MatDialog,){}

  inLoginPage(): boolean{
    return this.router.url==='/login';
  }
  inRegistrationPage(): boolean{
    return this.router.url==='/registration';
  }
  inAdmin(): boolean{
    return this.router.url==='/admin';
  }
  inregistrationlist(): boolean{
    return this.router.url==='/registrationlist';
  }
  openLogoutConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout(): void {
    // Implement your logout logic here.
    this.router.navigate(['login']);
  }
}
