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

    model = new User(18, 'Dr IQ', 'ChuckOverstreet');

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
                    this._router.navigate(['/admin'])
                },
                err => console.log(err)
            )
    }

}
