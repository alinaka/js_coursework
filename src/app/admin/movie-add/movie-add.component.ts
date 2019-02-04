import { Component, OnInit } from '@angular/core';
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  movie = {
  	title: '',
  	internationalTitle: '',
  	year: ''
  };
  message;
  errors;
  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  createMovie(movie){
    this.movieService.createMovie(movie).subscribe(
        res => this.message = res.message,
        err => console.log(err)
    )
  }

}
