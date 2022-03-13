/** 
 * The EditProfileFormComponent is used to render a mat dialog containing a form where the
 * user can edit their profile details. 
 * @module UserEditComponent
 */
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    /** 
   * userData values are populated by form inputs in the user-edit.component template that are bound 
   * using the ngModel directive.
   */ 
  @Input() newData = { Username: '', Password: '', Email: '', Birthday: '' };

  userData: any = {
    Username: this.data.username,
    Password: this.data.password,
    Email: this.data.email,
    Birthday: this.data.birthday
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    public snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      password: string;
      email: string;
      birthday: Date;
    }
  ) { }

  ngOnInit(): void {
  }

  /**
   * Invokes the editUser method on the fetchApiData service, with the profileData from the form,
   * in order to update the user's details. A successful update will reload the page.
   * A popup is displayed confirming update success. If unsuccessful, a popup message
   * asks the user to check the form fields and try again.
   */
  editUser(): void {
    //prevent sending an empty field (that would erase the previous data and replace it with null)
    if (this.newData.Username && this.newData.Password && this.newData.Email && this.newData.Birthday) {
      this.fetchApiData.editUser(this.data.username, this.newData).subscribe((resp: any) => {
        this.dialogRef.close();
        window.location.reload();
        localStorage.setItem('user', JSON.stringify(resp));
        this.snackbar.open('Data successfully updated', 'OK', { duration: 2000 })
      });
      //alert when submitting an empty field
    } else {
      this.snackbar.open('Plase fill all the fields', 'OK', { duration: 2000 })
    }
  }

}
