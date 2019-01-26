import { Component, OnInit } from '@angular/core';
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
    movies;

    constructor(private _movieService: MovieService) {
    }

    ngOnInit() {
        this.getAllMovies();
    }

    getAllMovies() {
        this._movieService.getAllMovies()
            .subscribe(
                res => {
                    this.movies = res.movies;
                },
                err => console.log(err)
            )
    }

    deleteMovie(movieId){
        this._movieService.deleteMovie(movieId).subscribe(
            res => console.log(res),
            err => console.log(err)
        )
    }

}
