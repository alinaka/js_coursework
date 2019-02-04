import { Component, OnInit } from '@angular/core';
import {ScoreService} from '../../score.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  errors;
  scores;

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.getAllScores();
  }

  getAllScores() {
    this.scoreService.getAllScores()
        .subscribe((response)=>{
          this.scores = response.scores;
        }, (err) => {
          this.errors = err;
        })
  }
}
