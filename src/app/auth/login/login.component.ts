import { Component, OnInit } from '@angular/core';
import {User} from "../../user";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model = {};
    errors;

    constructor(private _auth: AuthService,
                private _router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this._auth.loginUser(this.model)
            .subscribe(
                res => {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    if (res.isAdmin){
                        this._router.navigate(['/admin'])
                    } else {
                        this._router.navigate(['/user'])
                    }
                },
                err => {
                    this.errors = err.error.message;
                }
            )
    }

}
