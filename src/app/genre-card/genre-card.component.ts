/** 
 * The GenreComponent is used to render a mat dialog containing information about the genre
 * of the movie selected.
 * @module GenreCardComponent
 */
import { Component, OnInit, Inject } from '@angular/core';
// MAT_DIALOG_DATA is an injection token that allows access to data passed in to a dialog.
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})
export class GenreCardComponent implements OnInit {
  /**
   * The data that was passed to the Genre dialog in the MovieCardComponent is injected in to the 
   * constructor using the MAT_DIALOG_DATA injection token. The data becomes a property on the class
   * and is hence available to be output in the template.
   */
  genre: any = this.data.name;

  constructor(
    public fetchApiData: FetchApiDataService,

    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
    }
  ) { }

  ngOnInit(): void {
    this.getGenreDescription(this.genre);
  }

  //getting the full info on the current genre
  getGenreDescription(currentGenre: string): void {
    this.fetchApiData.getAGenre().subscribe((resp: any) => {
      this.genre = resp;
      return this.genre;
    });
  }
}