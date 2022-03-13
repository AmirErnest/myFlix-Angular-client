/** 
 * The UserProfileComponent is used to render a mat card displaying the user's profile details. This includes
 * two action buttons to edit their profile and deregister from the application, respectively.
 * @module ProfileComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { RemoveUserComponent } from '../remove-user/remove-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  UserFromStorage: any = localStorage.getItem('user');
  currentUser: any = (JSON.parse(this.UserFromStorage));
  currentUsername: any = this.currentUser.Username;
  currentFavs: any = this.currentUser.FavoriteMovies;
  favMovies: any = [];
  favsEmpty: boolean = true;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * Calls the getCurrentUser method as soon as the component loads so that the data can be used to populate
   * the template.
   */  

  ngOnInit(): void {
    this.getCurrentUser(this.currentUsername);
  }

  /** 
   * Invokes the getUser method on the fetchApiData service and populates the user object with
   * the response. 
   */ 

  getCurrentUser(currentUser: string): void {
    this.fetchApiData.getUser(currentUser).subscribe((resp: any) => {
      this.currentUser = resp;
      this.currentFavs = resp.FavoriteMovies;
      this.getFavMovies();
      this.areFavsEmpty();
      return (this.currentUser, this.currentFavs);
    });
  }

  getFavMovies(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.currentUser.FavoriteMovies.includes(movie._id)) {
          this.favMovies.push(movie);
        }
      });
    });
    return this.favMovies;
  }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

    /**
   * Opens a dialog containing the user-edit component that renders the edit profile form.
   */ 
  openUserEditDialog(
    username: string,
    password: string,
    email: string,
    birthday: Date
  ): void {
    this.dialog.open(UserEditComponent, {
      data: {
        username,
        password,
        email,
        birthday
      },
      width: '320px'
    });
  }

  openRemoveUserDialog(): void {
    this.dialog.open(RemoveUserComponent, {
      width: '320px'
    });
  }

  removeFromFavs(movieId: string): void {
    this.fetchApiData.removeFromFav(this.currentUsername, movieId).subscribe((resp: any) => {
      this.ngOnInit();
      this.snackBar.open('Removed from favs', 'OK', { duration: 2000 });
    });
    this.ngOnInit();
  }

  //checking whether favs are empty to create a boolean var for conditional rendering of "empty favs" message
  areFavsEmpty(): any {
    if (this.currentFavs.length == 0) {
      this.favsEmpty = true;
    } else {
      this.favsEmpty = false;
    }
    return this.favsEmpty;
  }
}