import {Injectable} from '@angular/core';
import {Question} from './question';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private questionsUrl = 'http://127.0.0.1:3000/api/movies';  // URL to web api
    private moviesUrl = 'http://127.0.0.1:3000/api/admin/movies';
    private movieUrl = 'http://127.0.0.1:3000/api/admin/movie/';
    private frameUrl = 'http://127.0.0.1:3000/api/admin/upload/';
    private openMovie = '/omdb/';

    constructor(private http: HttpClient) {
    }

    getQuestions(): Observable<Question[]> {
        return this.http.get<Question[]>(this.questionsUrl);
    }

    getAllMovies(): Observable<any> {
        return this.http.get<any>(this.moviesUrl);
    }

    getMovie(movieId): Observable<any> {
        return this.http.get<any>(this.movieUrl + movieId)
    }

    getMovieInfo(movie): Observable<any> {
        const url = this.openMovie + `?t=${movie.internationalTitle}&y=${movie.year}&apikey=6fe2c44`;
        return this.http.get<any>(url)
    }

    updateMovie(movie, movieId): Observable<any> {
        return this.http.put<any>(this.movieUrl + movieId, movie)
    }

    createMovie(movie): Observable<any> {
        return this.http.post<any>(this.movieUrl, movie)
    }

    deleteMovie(movieId): Observable<any> {
        return this.http.delete<any>(this.movieUrl + movieId, movieId)
    }

    addFrame(file, movieId): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('frame', file, file.name);
        formData.append('movieId', movieId);
        return this.http.post<any>(this.frameUrl, formData);
    }
}
