import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
    movie;
    constructor(private route: ActivatedRoute,
                private location: Location,
                private _movieService: MovieService) { }

    ngOnInit() {
        const id = +this.route.snapshot.paramMap.get('id');
        this._movieService.getMovie(id).subscribe(
            res => this.movie = res.movie,
            err => console.log(err)
        )
    }

    updateMovie(movie, movieId){
        console.log(movie, movieId);
        this._movieService.updateMovie(movie, movieId).subscribe(
            res => console.log(res),
            err => console.log(err)
        )
    }


}
