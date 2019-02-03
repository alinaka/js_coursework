import { Component, OnInit } from '@angular/core';
import {ScoreService} from '../../score.service';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  score;
  time;
  errors;
  message;
  scoreResponse;
  username;

  constructor(private scoreService: ScoreService,
              private authService: AuthService) { }

  ngOnInit() {
  	this.score = localStorage.getItem('score');
    this.time = localStorage.getItem('time');
    let user = JSON.parse(localStorage.getItem('user'));
    this.username = user.username;
  	if (+this.score && +this.time){
  	  this.saveScore();
  	}
  }

  saveScore(): void {
    this.scoreService.saveScore(this.score, this.time)
      .subscribe(response => {
        this.message = response.message;
        this.scoreResponse = response.score;
        localStorage.removeItem('score');
        localStorage.removeItem('time');
      },
      errors => {
        this.errors = errors;
        console.log(errors);
      });
  }

  logout() {
    this.authService.logoutUser();
  }

}
