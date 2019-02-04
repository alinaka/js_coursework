import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreUrl = 'http://127.0.0.1:3000/api/users/score';

  constructor(private http: HttpClient) { }

  saveScore(score, time): Observable<any> {
  	let result = {
  		score: score,
  		time: time
  	};
    return this.http.post<any>(this.scoreUrl, result);
  }

  getAllScores(): Observable<any> {
    return this.http.get<any>(this.scoreUrl);
  }
}
