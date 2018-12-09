import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MovieService} from '../movie.service';
import {Question} from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[];
  currentQuestion;
  result = 0;
  selected;
  counter = 0;
  time = 50;
  message;
  interval;

  constructor(public ngxSmartModalService: NgxSmartModalService,
              private router: Router,
              private movieService: MovieService) {
  }

  ngOnInit() {
    this.getQuestions();
    this.interval = setInterval(() => {
      this.runTime();
    }, 1000);

  }
  runTime() {
    this.time--;
    if (this.time === 0) {
      clearInterval(this.interval);
      this.message = 'You\'ve ran out of time!\n';
      this.finishGame();
    }
  }

  startGame() {
    this.result = 0;
    this.ngxSmartModalService.getModal('myModal').close();
    this.router.navigate(['/dashboard']);
  }

  finishGame() {
    this.ngxSmartModalService.getModal('myModal').open();
  }

  showNext(box, counter) {
    this.selected = null;
    box.classList.remove('right');
    box.classList.remove('wrong');
    if (counter <= this.questions.length - 1) {
      this.currentQuestion = this.questions[counter];
    } else {
      this.finishGame();
    }
  }

  checkAnswer(box, answer) {
    box.classList.remove('active');
    if (this.isAnswerRight(answer)) {
      this.result++;
      box.classList.add('right');
    } else {
      box.classList.add('wrong');
    }
  }

  isAnswerRight(answer) {
    return answer === this.currentQuestion.options[this.currentQuestion.answer];
  }

  selectAnswer(box, answer) {
    this.selected = answer;
    this.counter++;
    setTimeout(() => {
      this.checkAnswer(box, answer);
    }, 1000);
    setTimeout(() => {
      this.showNext(box, this.counter);
    }, 2000);
  }

  getQuestions(): void {
    this.movieService.getQuestions()
      .subscribe(questions => {
        // this.questions = questions;
        // this.currentQuestion = this.questions[0];
        console.log(questions);
      });
  }
}
