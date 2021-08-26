import { Component, OnInit, Input } from '@angular/core';

// Server-side API calls
import { FetchAPiDataService } from '../fetch-api-data.service';

// Service for displaying snack-bar notifications.
import { MatSnackBar } from '@angular/material/snack-bar';
// Reference to a dialog opened via the MatDialog service.
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    username: '',
    password: '',
  };

  constructor(
    public fetchApiData: FetchAPiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void { }

  loginUser(): void {
    this.router.navigate(['movies']);
    this.fetchApiData.userLogin(this.userData).subscribe(
      // Login successful.
      (response) => {
        // Store current user and token in localStorage.
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('token', response.token);

        this.dialogRef.close();
        this.snackBar.open(`Welcome back, ${response.user.name}!`, 'OK', {
          duration: 3000,
        });

      },
      // Login unsuccessful.
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 3000,
        });

      }
    );
  }
}