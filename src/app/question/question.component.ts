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
  errors;

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
  }

  openDashboard() {
    this.startGame();
    this.router.navigate(['/dashboard']);
  }

  openGame() {
      this.startGame();
      this.router.navigate(['/quiz']);
  }

  finishGame() {
    clearInterval(this.interval);
    let resultTime = 50 - this.time;
    localStorage.setItem('score', this.result.toString());
    localStorage.setItem('time', resultTime.toString());
    this.ngxSmartModalService.getModal('myModal').open();
  }

  showNext(box, counter) {
    box.classList.remove('right');
    box.classList.remove('wrong');
    if (counter <= this.questions.length - 1) {
      this.currentQuestion = this.questions[counter];
      this.selected = null;
    } else {
      this.finishGame();
    }
  }

  passFrame() {
      this.counter++;
      if (this.counter <= this.questions.length - 1) {
          this.currentQuestion = this.questions[this.counter];
          this.selected = null;
      } else {
          this.finishGame();
      }
  }

  removeWrong(){
      let wrong = [];
      for (let i = 0; i < this.currentQuestion.options.length; i++){
        if (this.currentQuestion.options[i].title !== this.currentQuestion.answer){
          wrong.push(this.currentQuestion.options[i].title);
        }
      }
      for (let i = 0; i < 2; i++){
          let index = Math.floor( Math.random()*wrong.length );
          for (let i = 0; i < this.currentQuestion.options.length; i++){
              if (this.currentQuestion.options[i].title === wrong[index]){
                  wrong.splice(index, 1);
                  this.currentQuestion.options[i].internationalTitle = '';
                  this.currentQuestion.options[i].year = '';
                  break;
              }
          }
      }
  }

  checkAnswer(box, answer) {
    box.classList.remove('active');
    if (this.isAnswerRight(answer)) {
      this.result++;
      this.time = this.time + 5;
      box.classList.add('right');
    } else {
      box.classList.add('wrong');
    }
  }

  isAnswerRight(answer) {
    return answer === this.currentQuestion.answer;
  }

  selectAnswer(box, answer) {
    if (this.selected) {
      return
    }
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
        this.questions = questions;
        this.currentQuestion = this.questions[0];
      },
      errors => {
        this.errors = errors;
        console.log(errors);
      });
  }

  saveScore(){
    this.router.navigate(['/user'])
  }
}
