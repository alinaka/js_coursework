import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private baseUrl = environment.apiUrl;
    private _reqisterUrl = this.baseUrl + 'api/auth/register';
    private _loginUrl = this.baseUrl + 'api/auth/login';
    private _tokenexp = this.baseUrl + 'api/auth/token';

    constructor(private http: HttpClient,
                private _router: Router) {
    }

    registerUser(user) {
        return this.http.post<any>(this._reqisterUrl, user)
    }

    loginUser(user) {
        return this.http.post<any>(this._loginUrl, user)
    }


    logoutUser() {
        localStorage.removeItem('token');
        this._router.navigate(['/dashboard']);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isTokenExpired() {
        return this.http.get<any>(this._tokenexp);
    }
}
