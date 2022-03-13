/** 
 * The MovieCardComponent is used to display the data retrieved from the movies collection of the
 * myFlix database. The data is looped through using the ngFor directive and each movie is rendered as
 * a mat card in the template. The cards display the title, director and an image of the movie and contain
 * buttons that can be opened to display dialogs with further information about the director or genre, 
 * Movies can be added to or removed from favourites by clicking on a heart icon contained
 * in corner of each card. The heart colour toggles accordingly to reflect the movie's status.
 * 
 * @module MovieCardComponent
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// Used to access various functions created on the service that are needed by this component
import { FetchApiDataService } from '../fetch-api-data.service';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  username: any = localStorage.getItem('user');
  user: any = JSON.parse(this.username);
  currentUser: any = null;
  currentFavs: any = null;
  isInFavs: boolean = false;

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * Calls the getMovies and getCurrentUser methods as soon as the component loads so that 
   * the data can be used to populate the template.
   */ 

  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser(this.user.Username);
  }

   /** 
   * Invokes the getUser method on the fetchApiData service and populates the favourites array with
   * the favouriteMovies property on the response, which is an array of the user's favourite movies. 
   */
  getCurrentUser(username: string): void {
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.currentUser = resp;
      this.currentFavs = resp.FavoriteMovies;
      return (this.currentUser, this.currentFavs);
    });
  }

  /** 
   * Invokes the getAllMovies method on the fetchApiData service and populates the movies array with
   * the response. 
   */ 

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openDescriptionDialog(
    title: string,
    description: string,
  ): void {
    this.dialog.open(DescriptionCardComponent, {
      data: {
        title,
        description
      },
      width: '500px'
    });
  }

    /**
   * Opens a dialog to display the director component, passing it the data it needs to display
   * information about the director inside the data object.
   * @param name Name of the director of the movie selected.
   * @param bio Biography of the director.
   * @param birth Year of birth of the director.
   * @param death Year of death of the director.
   */

  openDirectorDialog(
    name: string,
    bio: string,
    birth: Date,
    death: Date
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        name,
        bio,
        birth,
        death
      },
      width: '500px'
    });
  }

    /**
   * Opens a dialog to display the genre component, passing it the data it needs to display
   * genre information inside the data object.
   * @param name Name of the genre for the movie selected.
   * @param description Description of the genre.
   */

  openGenreDialog(
    name: string,
    description: string
  ): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        name,
        description,
      },
      width: '500px'
    });
  }

  openProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  /**
   * Extracts the IDs of the user's favourite movies and checks to see if the movie selected is 
   * included. If included, calls the removeFromFavs method; if not included, calls
   * the addToFavs method.
   * @param movieID ID of the movie selected.
   */
  toggleFavs(movieId: string): void {
    if (this.favCheck(movieId)) {
      this.removeFromFavs(movieId);
      this.isInFavs = false;
    } else {
      this.addToFavs(movieId)
      this.isInFavs = true;
    }
  }

    /**
   * Invokes the addtoFav method on the fetchApiData service, to add the movie to the user's
   * favourites. If successful, a popup is displayed confirming that the movie has been added.
   * @param movieID ID of the movie selected.
   */

  addToFavs(movieId: string): void {
      this.fetchApiData
      .addToFav(this.user.Username, movieId)
      .subscribe((resp: any) => {
        this.getCurrentUser(this.user.Username);
        this.ngOnInit();
        this.snackBar.open('Added to favs', 'OK', { duration: 2000 });
      });
  }

    /**
   * Invokes the removeFromFav method on the fetchApiData service, to delete the movie from 
   * the user's favourites. If successful, a popup is displayed confirming that the movie has been
   * removed.
   * @param movieID 
   */
  removeFromFavs(movieId: string): void {
    this.fetchApiData.removeFromFav(this.user.Username, movieId).subscribe((resp: any) => {
      this.snackBar.open('Removed from favs', 'OK', { duration: 2000 });
      this.getCurrentUser(this.user.Username);
      this.ngOnInit();
      2000
    });
  }

  favCheck(movieId: string): boolean {
    return this.currentFavs.includes(movieId);
  }
}