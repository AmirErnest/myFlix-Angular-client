/** 
 * The UserRegistrationFormComponent is used to render a mat dialog containing a form where the
 * user can complete and submit a profile to register for myFlix. 
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';

//to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';

//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  /** 
   * userData values are populated by form inputs in the user-registration-form template that are 
   * bound using the ngModel directive.
   */ 
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

    /** 
   * Passing classes as parameters to the constructor sets them as properties on the component class 
   * that can then be accessed as needed.
   */ 

  constructor(
    public fetchApiData: FetchApiDataService,
    // Creates a reference to the dialog that contains the UserRegistrationForm component
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
}

  /**
   * Invokes the userRegistration method on the fetchApiData service, with the userData from the form,
   * in order to register the user. 
   */

registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
