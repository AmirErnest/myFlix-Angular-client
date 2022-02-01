import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {
  
  /** 
   * bind form input values to userCredentials object 
   */
  @Input() userCredentials= { Username: '', Password: '' };

  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
      ) { }

  /**
  * Initializes the component
  * @ignore
  */
  ngOnInit(): void {
  }


    /**
    * Logs the user in by sending a request to the backend endpoint.
    * A snack bar is shown, holding a message about the result of the operation.
    */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.dialogRef.close();
      this.snackBar.open('You are now logged in', 'OK', {
          duration: 2000
      });
      this.router.navigate(['movies'])
    }, (response) => {
      console.log(response)
      this.snackBar.open('Incorrect username or password. Please try again.', 'OK', {
        duration: 2000
      });
    });
  }
}
