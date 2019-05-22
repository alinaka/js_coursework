import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreUrl = environment.apiUrl + 'api/users/score';

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
