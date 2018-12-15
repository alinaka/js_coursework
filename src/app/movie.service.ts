import { Injectable } from '@angular/core';
import { Question } from './question';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private questionsUrl = 'http://127.0.0.1:3000/quiz/movies';  // URL to web api

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionsUrl);
  }

}
