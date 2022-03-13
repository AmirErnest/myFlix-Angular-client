/** 
 * The WelcomePageComponent is used to render a mat card containing a welcome message for users. It includes
 * action buttons for registration and logging in. Clicking the relevant button opens a mat dialog containing 
 * the component responsible for handling that process.
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

    /**
   * Sets MatDialog as a property on the component class.
   * @param dialog Class used to create dialogs in which other components can be rendered.
   */ 
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

   /** 
   * Opens a dialog containing the user-registration-form component that renders the registration form.
   */ 
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

    /**
   * Opens a dialog containing the user-login-form component that renders the login form.
   */ 
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}