import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent implements OnInit {
    movie;
    movieInfo;
    constructor(private route: ActivatedRoute,
                private location: Location,
                private _movieService: MovieService) { }

    ngOnInit() {
        this.getMovie()
    }
    getMovie() {
        const id = +this.route.snapshot.paramMap.get('id');
        this._movieService.getMovie(id)
            .subscribe(
                res => {
                    this.movie = res.movie;
                    this._movieService.getMovieInfo(this.movie).subscribe(
                        res => this.movieInfo = res,
                        err => console.log(err)
                    )
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
