import { Component, OnInit } from '@angular/core';
import {MovieService} from "../../movie.service";

@Component({
  selector: 'app-frame-add',
  templateUrl: './frame-add.component.html',
  styleUrls: ['./frame-add.component.css']
})
export class FrameAddComponent implements OnInit {
  fileToUpload: File = null;
  frame;
  message;
  movies;
  movieId;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getAllMovies()
      .subscribe((movies)=>{
        this.movies = movies.movies;
      }, (err)=> console.log(err));
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.movieService.addFrame(this.fileToUpload, this.movieId)
    .subscribe(data => {
        this.message = data.message;
        this.frame = data.frame;
      }, error => {
        console.log(error);
      });
  }

}
